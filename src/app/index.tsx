import { RouterProvider } from 'react-router-dom';
import { router } from 'app/config/router';
import { withProviders } from 'app/providers';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  return <RouterProvider router={router} />;
}

export default withProviders(App);
