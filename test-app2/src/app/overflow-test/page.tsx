"use client";

import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const OverflowTestPage = () => {
    const menuItems: IOverflowMenuItem[] = [
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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Overflow Menu Test Page</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Content</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{row}</td>
                            <td className="py-2 px-4 border-b">
                                <OverflowMenu items={menuItems} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OverflowTestPage;