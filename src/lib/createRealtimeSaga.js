import realtimeSaga from 'ra-realtime'
import config from "config"
import io from 'socket.io-client'
import url from "url"
import {Profiles} from "lib/authClient"
import { GET_LIST } from "ra-core"

class WsSubscription {
  start(observer, refresh) {
    let uri = url.parse(config.apiUrl)
    this.observer = observer
    this.socket = io(`${uri.protocol}//${uri.host}/?token=${Profiles.getToken()}`, {
      transports: ["websocket", "polling"]
    })
    this.socket.on("alert", () => refresh(this.observer))
  }
  stop() {
    this.socket.close()
    this.observer.complete()
  }
}

const observeRequest = dataProvider => (type, resource, params) => {
    if(resource === "alerts" && params.filter && params.filter.realTime) {
      const refresh = observer => dataProvider(type || GET_LIST, resource, params)
                                    .then(results => {
                                      console.log('resulst', results)
                                      observer.next(results)
                                    })
                                    .catch(error => {
                                      console.log(error)
                                      observer.error(error)
                                    })
      return {
        subscribe(observer) {
            const subscription = new WsSubscription()
            subscription.start(observer, refresh)
            return ({
                unsubscribe() {
                  if(!subscription.stopped) {
                    subscription.stopped = true
                    subscription.stop()
                  }
                }
            })
        }
      }
    }

};

export default dataProvider => realtimeSaga(observeRequest(dataProvider))
