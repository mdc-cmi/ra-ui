import { useSelector  } from 'react-redux';
import useRouter from './use-react-router';
import {get}   from "lodash"

export default function useRecord(resource) {
  const {match: {params: {id}}}   = useRouter()
  const record                  = useSelector(
      state => get(state, `admin.resources.${resource}.data.${id}`))
  return record
}
