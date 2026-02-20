import React from 'react';
import OverflowMenu from 'jattac.libs.web.overflow-menu';

const App = () => {
    const menuItems = [
        {
            content: 'Edit',
            onClick: () => alert('Editing!'),
            children: [
                {
                    content: 'Edit Name',
                    onClick: () => alert('Editing Name!'),
                },
                {
                    content: 'Edit Details',
                    onClick: () => alert('Editing Details!'),
                    children: [
                        {
                            content: 'General',
                            onClick: () => alert('Editing General Details!'),
                        },
                        {
                            content: 'Advanced',
                            onClick: () => alert('Editing Advanced Details!'),
                        },
                    ],
                },
            ],
        },
        {
            content: 'Delete',
            onClick: () => alert('Deleting!'),
        },
        {
            content: 'Admin Only',
            visible: false,
            onClick: () => alert('Admin Action!'),
        },
        {
            content: 'Conditional Action',
            visible: () => true,
            enabled: () => false,
            onClick: () => alert('Conditional!'),
        },
        {
            content: 'Async Visible',
            visible: () => new Promise((resolve) => setTimeout(() => resolve(true), 1000)),
            onClick: () => alert('Async Visible!'),
        },
        {
            content: 'Async Disabled',
            enabled: () => new Promise((resolve) => setTimeout(() => resolve(false), 500)),
            onClick: () => alert('Async Disabled!'),
        },
    ];

    const tableData = Array.from({ length: 100 }, (_, i) => `Row ${i + 1}`);

    return (
        <div>
            <h1>Overflow Menu Test</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row}</td>
                            <td>
                                <OverflowMenu items={menuItems} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
