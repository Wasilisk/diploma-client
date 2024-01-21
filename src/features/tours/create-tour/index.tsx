import { Button } from 'shared/ui/button';
import { Dialog, Tab } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from 'react';
import { Stepper } from 'react-form-stepper';
import { FieldPath, FormProvider, useForm } from 'react-hook-form';
import { IconButton } from 'shared/ui/icon-button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addDays } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTourFormValues, UpdateTicketTypesData } from 'shared/utils/types';
import { createTourSteps } from 'features/tours/create-tour/constants';
import { GeneralInfoForm } from 'features/tours/create-tour/general-info-form';
import { AdditionalInfoForm } from 'features/tours/create-tour/additional-info-form';
import { TicketsForm } from 'features/tours/create-tour/tickets-form';
import { ScheduleForm } from 'features/tours/create-tour/schedule-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ToursService } from 'shared/services/tours-service';
import { endpoints } from 'shared/utils/constants';
import { useTourModal } from 'shared/utils/hooks/use-tour-modal';
import { createTourFormSchema } from 'shared/utils/validations/create-tour-form-schema';
import { parseDefaultValues, parseTourScheduleForPayload } from 'features/tours/create-tour/utils';
import { isEmpty } from 'underscore';

export const CreateTour = () => {
  const {
    isOpen,
    selectedDirection,
    defaultValues,
    setIsOpen,
    setSelectedDirection,
    setDefaultValue,
  } = useTourModal();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);
  const parsedDefaultValue = useMemo(
    () => parseDefaultValues(defaultValues, selectedDirection),
    [JSON.stringify(defaultValues), selectedDirection?.id],
  );
  const methods = useForm<CreateTourFormValues>({
    resolver: zodResolver(createTourFormSchema),
    defaultValues: {
      gallery: [],
      schedule: {
        startDate: new Date().toISOString(),
        endDate: addDays(new Date(), 1).toISOString(),
      },
    },
    values: parsedDefaultValue,
  });

  const isEditMode = !!defaultValues || !!selectedDirection;

  const { mutate: createTour, isLoading: isLoadingCreate } = useMutation(ToursService.create, {
    onSuccess: async (res) => {
      const tourId = res.data.id;
      const values = methods.getValues();
      const addTicketTypes = ToursService.addTicketTypes(
        values.tickets.map((ticket) => ({ ...ticket, tourId })),
      );
      try {
        const addTourSchedule = ToursService.addSchedule(
          parseTourScheduleForPayload(tourId, values.schedule),
        );
        await Promise.all([addTicketTypes, addTourSchedule]);
        toast.success('Екскурсію успішно створенно');
        closeModal();
        methods.reset();
        return queryClient.invalidateQueries({ queryKey: endpoints.tours });
      } catch {
        await ToursService.delete(tourId);
        toast.error('Помилка під час створення екскурсії');
      }
    },
  });

  const { mutate: updateTour, isLoading: isLoadingUpdate } = useMutation(ToursService.update, {
    onSuccess: async () => {
      try {
        const values = methods.getValues();

        if (defaultValues) {
          const newTicketTypes = values.tickets
            .filter(({ id }) => !id)
            .map((ticket) => ({
              tourId: defaultValues.id,
              name: ticket.name,
              price: ticket.price,
            }));
          const addTicketTypes = ToursService.addTicketTypes(newTicketTypes);
          const updateTicketTypes = ToursService.updateTicketTypes(
            values.tickets.filter(({ id }) => id) as UpdateTicketTypesData[],
          );
          const updateTourSchedule = ToursService.updateSchedule(
            parseTourScheduleForPayload(defaultValues.id, values.schedule),
          );

          await Promise.all([
            !isEmpty(newTicketTypes) ? addTicketTypes : Promise.resolve(null),
            updateTicketTypes,
            updateTourSchedule,
          ]);
          toast.success('Екскурсію успішно оновлено');
          closeModal();
          methods.reset();
        }
        return queryClient.invalidateQueries({ queryKey: endpoints.tours });
      } catch {
        toast.error('Помилка під час оновлення екскурсії');
      }
    },
  });

  const closeModal = () => {
    methods.reset();
    setCurrentStep(0);
    setIsOpen(false);
    setDefaultValue(null);
    setSelectedDirection(null);
  };

  const onValid = (data: CreateTourFormValues) => {
    const tourPayload = {
      name: data.name,
      description: data.description,
      directionId: data.direction!.id.toString(),
      content: data.content,
      tourInfo: data.tourInfo,
      files: data.files.map((file) => file.file),
    };

    isEditMode && defaultValues
      ? updateTour({
          id: defaultValues.id.toString(),
          gallery: data.gallery.map((image) => image.url),
          ...tourPayload,
        })
      : createTour(tourPayload);
  };

  const handleIncrementStep = async () => {
    const validationTargets: Record<number, FieldPath<CreateTourFormValues>[]> = {
      0: ['name', 'description', 'content', 'files', 'direction'],
      1: ['tourInfo'],
      2: ['tickets'],
      3: ['schedule'],
    };

    const isValidate = await methods.trigger(validationTargets[currentStep]);

    if (isValidate) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };
  const handleDecrementStep = () => setCurrentStep((prevState) => prevState - 1);

  return (
    <Dialog as='div' className='relative z-10' onClose={closeModal} open={isOpen}>
      <div className='fixed inset-0 bg-black/25' />
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center sm:py-4'>
          <Dialog.Panel className='relative w-full max-w-screen-md transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl sm:rounded-2xl sm:px-6 sm:py-6'>
            <div className='absolute right-0 top-0 cursor-pointer p-2' onClick={closeModal}>
              <CloseIcon />
            </div>
            <Dialog.Title
              as='h3'
              className='mb-6 text-center text-3xl font-bold leading-10 text-neutral-800'
            >
              Створення екскурсії
            </Dialog.Title>
            <Stepper
              steps={createTourSteps}
              activeStep={currentStep}
              connectorStyleConfig={{
                activeColor: '#FACC15',
                disabledColor: '#E5E7EB',
                completedColor: '#FACC15',
                size: 1,
                stepSize: '2em',
                style: 'solid',
              }}
              styleConfig={{
                activeBgColor: '#FACC15',
                completedBgColor: '#FACC15',
                inactiveBgColor: '#E5E7EB',
                activeTextColor: '#000000',
                completedTextColor: '#000000',
                inactiveTextColor: '#000000',
                size: '2em',
                circleFontSize: '1em',
                labelFontSize: '0.875rem',
                borderRadius: '50%',
                fontWeight: 500,
              }}
            />
            <div className='flex flex-col gap-y-4'>
              <Tab.Group key={currentStep} selectedIndex={currentStep}>
                <Tab.Panels>
                  <FormProvider {...methods}>
                    <GeneralInfoForm />
                    <AdditionalInfoForm />
                    <TicketsForm />
                    <ScheduleForm />
                  </FormProvider>
                </Tab.Panels>
              </Tab.Group>
              <div className='flex w-full justify-end gap-x-2'>
                <div className='flex-1'>
                  {currentStep > 0 && (
                    <IconButton
                      className='h-14 rounded-lg'
                      icon={<ArrowBackIcon />}
                      onClick={handleDecrementStep}
                    />
                  )}
                </div>
                <Button variant='secondary' onClick={closeModal}>
                  Скасувати
                </Button>
                {currentStep === createTourSteps.length - 1 ? (
                  <Button
                    variant='primary'
                    onClick={methods.handleSubmit(onValid)}
                    disabled={isLoadingCreate || isLoadingUpdate}
                  >
                    Створити
                  </Button>
                ) : (
                  <Button variant='primary' onClick={handleIncrementStep}>
                    Далі
                  </Button>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
