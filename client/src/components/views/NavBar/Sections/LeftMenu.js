import React from 'react';
import { Menu } from 'antd';
// const { SubMenu, ItemGrop } = Menu;

function LeftMenu(props) {
    const menuItems = [        
        {
            key: 'mail',
            label: <a href="/">Hone</a>,
        },
        {
            key: 'blogs',
            label: 'Blogs',
            children: [
                {
                    key: 'item1',
                    label: 'Item 1',
                    children: [
                        {
                            key: 'setting:1',
                            label: 'Option1',
                        },
                        {
                            key: 'setting:2',
                            label: 'Option2',
                        },
                    ],
                },
                {
                    key: 'item2',
                    label: 'Item 2',
                    children: [
                        {
                            key: 'setting:3',
                            label: 'Option 3',
                        },
                        {
                            key: 'setting:4',
                            label: 'Option 4',
                        },
                    ],
                },
            ],
        },
    ]           
    
    return (
        <Menu mode={props.mode} items={menuItems} />
    )
}

export default LeftMenu

/* 
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <SubMenu title={<span>Blogs</span>}>
                <MenuItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>                
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    )
 */