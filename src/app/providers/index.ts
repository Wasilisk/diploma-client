import compose from 'compose-function';
import { withQueryProvider } from 'app/providers/with-query-provider';
import { withToast } from 'app/providers/with-toast';

export const withProviders = compose(withQueryProvider, withToast);
