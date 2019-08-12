import { useContext  } from 'react';
import { __RouterContext } from 'react-router';

const INCORRECT_VERSION_ERROR =
  new Error('use-react-router may only be used with react-router@^5.');

const MISSING_CONTEXT_ERROR =
  new Error('useReactRouter may only be called within a <Router /> context.');

export default function useRouter() {
  // If this version of react-router does not support Context,
  if (!__RouterContext) {
    throw INCORRECT_VERSION_ERROR;
  }
// If the react-router Context is not a parent Component,
  const context = useContext(__RouterContext)
  if (!context) {
    throw MISSING_CONTEXT_ERROR;
  }

  return context
}
