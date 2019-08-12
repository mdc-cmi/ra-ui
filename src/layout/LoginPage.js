import React from "react";
import { userLogin } from "ra-core";
import {Login} from "ra-ui-materialui"
import { useEffect, useDispatch} from "hooks";

export default props => {
  const dispatch = useDispatch()
  useEffect(() => {
    let url = new URL(document.location.href)
    let [,authorization] = url.hash.match(/\?authorization=([^/]+)/) || []
    if(authorization) {
      dispatch(userLogin({token: authorization}, "/profile"))
    }
  }, [dispatch])

  return <Login {...props} />
}
