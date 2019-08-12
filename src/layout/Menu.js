import React, { useState } from 'react';
import { WithPermissions} from "ra-core";
import { DashboardMenuItem, MenuItemLink, Responsive } from "ra-ui-materialui";
import SettingsIcon from "@material-ui/icons/Settings"
import SubMenu from './SubMenu';
import {checkPermissions}               from "components"
import {compact}                        from "lodash"
import {useTranslate, useSelector}      from "hooks"
import {items}                          from "config/menu"

function renderItems(permissions, items, onMenuClick, translate) {
  return compact(items.map(item => (
    checkPermissions(permissions, ...item.permissions) ? <MenuItemLink
            key={item.name}
            to={item.path || `/${item.name}`}
            primaryText={translate(item.label || `resources.${item.name}.name`, { smart_count: 2 })}
            leftIcon={item.icon}
            onClick={onMenuClick}
        /> : null
  )))
}

export default ({onMenuClick, logout}) => {
  const translate           = useTranslate()
  const sidebarIsOpen       = useSelector(state => state.admin.ui.sidebarOpen)
  const [isOpen, setIsOpen] = useState()

  return (<WithPermissions render={({ permissions }) => {
    const configItems = renderItems(permissions, items.filter(item => item.group === "config"), onMenuClick, translate)
    return (
      <div>
          {' '}
          <DashboardMenuItem onClick={onMenuClick} />
          {renderItems(permissions, items.filter(item => item.group === undefined), onMenuClick, translate)}
          {configItems.length > 0 &&
            <SubMenu
                handleToggle={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
                sidebarIsOpen={sidebarIsOpen}
                name="titles.config"
                icon={<SettingsIcon />}
            >
              {configItems}
            </SubMenu>
          }
          <Responsive
              small={logout}
              medium={null} // Pass null to render nothing on larger devices
          />
      </div>)
    }} />)
}
