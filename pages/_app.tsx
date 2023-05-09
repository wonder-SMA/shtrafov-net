import { Provider } from 'react-redux';
import { Flip, ToastContainer } from 'react-toastify';
import { store } from '@/store';
import { startMirage } from '@/mirage/config';
import type { AppProps } from 'next/app';
import { Arimo } from 'next/font/google';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

startMirage();

const arimo = Arimo({
  subsets: ['latin', 'cyrillic'],
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={750}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
          transition={Flip}
        />
      </Provider>

      <style jsx global>
        {`
          html {
            font-family: ${arimo.style.fontFamily};
          }
        `}
      </style>
    </>
  );
}
