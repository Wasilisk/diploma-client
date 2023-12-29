import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { AxiosErrorResponseData, SupportMessageStatus } from 'shared/utils/types';
import { SetMessageStatusAsResolved } from 'features/technical-support/set-message-status-as-resolved';
import { useMutation, useQueryClient } from 'react-query';
import { SupportMessagesService } from 'shared/services';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import { endpoints } from 'shared/utils/constants';
import { DeleteMessage } from 'features/technical-support/delete-message';

interface ReplyFormProps {
  messageId: number;
  status: SupportMessageStatus;
}

export const ReplyForm = ({ messageId, status }: ReplyFormProps) => {
  const queryClient = useQueryClient();
  const [replyMessage, setReplyMessage] = useState('');
  const { mutate: replyToMessage, isLoading } = useMutation(SupportMessagesService.replyToMessage, {
    onSuccess: () => {
      toast.success('Відповідь успішно відправлено');
      return queryClient.invalidateQueries({ queryKey: endpoints.supportMessage.message });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(event.target.value);
  };

  const handleSubmit = () => {
    !!replyMessage && replyToMessage({ id: messageId, content: replyMessage });
  };

  return (
    <div className='flex flex-col gap-2 pt-4'>
      <TextArea
        className='px-4 py-2'
        placeholder='Ваша відповідь...'
        value={replyMessage}
        onChange={handleChange}
      />
      <div className='flex'>
        <Button variant='primary' disabled={isLoading} onClick={handleSubmit}>
          Надіслати
        </Button>
        <div className='flex flex-1 justify-end gap-x-2'>
          {status === SupportMessageStatus.ACTIVE && (
            <SetMessageStatusAsResolved messageId={messageId} />
          )}
          <DeleteMessage messageId={messageId} />
        </div>
      </div>
    </div>
  );
};
