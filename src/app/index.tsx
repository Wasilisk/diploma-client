import { AppRouter } from 'app/config/router';
import { withProviders } from 'app/providers';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-multi-carousel/lib/styles.css';
function App() {
  return <AppRouter />;
}

export default withProviders(App);
