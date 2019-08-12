import React from 'react';
import Icon from '@material-ui/core/Icon';
// import SvgIcon from '@material-ui/core/SvgIcon';
// import * as channels from 'components/icons/channels';
// import * as monitoring from 'components/icons/monitoring';

export default (props) => {
  const {size = 24, children} = props
//  let match = children.match(/^(\w+):(\w+)$/)
  // if(match) {
  //   const [, prefix, icon] = match
  //   const source = ({
  //     sasi: channels,
  //     monitoring: monitoring
  //   })[prefix]
  //
  //   if(source) {
  //     const viewBox = "0 0 12500 12500"
  //     return <SvgIcon
  //         xmlns="http://www.w3.org/2000/svg"
  //   			xmlnsXlink="http://www.w3.org/1999/xlink"
  //         width={size}
  //         height={size}
  //         style={{fontSize: size}}
  //         viewBox={viewBox}
  //         >
  //       <use xlinkHref={`${source[icon]}#${icon}`} viewBox={viewBox} />
  //     </SvgIcon>
  //   }
  // }
  return <Icon size={size}>{children}</Icon>
}
