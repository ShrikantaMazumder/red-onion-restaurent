import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {
    // const data = fakeData;
    const handleAddInventory = () => {
        // fetch('https://secret-earth-29040.herokuapp.com/add-products',{
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        // })
    }

    return (
        <div>
            <h3>Manage Inventory Here</h3>
            <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;