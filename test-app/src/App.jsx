import React from 'react';
import OverflowMenu from 'jattac.libs.web.overflow-menu';

const App = () => {
    const menuItems = [
        {
            content: 'Edit',
            onClick: () => alert('Editing!'),
        },
        {
            content: 'Delete',
            onClick: () => alert('Deleting!'),
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
