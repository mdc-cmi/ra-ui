import {useState, useCallback, useEffect, useRef} from "react"
import useAccount from './use-account';
import useRecord from './use-record';
import useRouter from './use-react-router';
import useWhyDidYouUpdate from './use-account';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslate} from 'ra-core';

const useStateToggle = () => {
  const [value, setValue] = useState()
  const toggle = useCallback(() => setValue(!value), [value, setValue])
  return [value, toggle]
}

export {
  useState, useCallback, useEffect, useRef,
  useRecord, useAccount, useRouter, useWhyDidYouUpdate,
  useDispatch, useSelector,
  useTranslate,
  useStateToggle
}
