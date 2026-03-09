import React from 'react';

const ApparelList = ({ apparelNo }) => {
    const [size, setSize] = React.useState("");
  return (
    <div className="ApparelCard" style={{ border: '1px solid #ddd', padding: '15px', width: '200px' }}>
      <img 
        src={apparelNo.imagePath} 
        alt={apparelNo.itemName} 
        style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
      />
      <h3>{apparelNo.itemName}</h3>
      <p>Category: {apparelNo.category}</p>
      <p>Cost: ${apparelNo.cost.toFixed(2)}</p>
      <p>Color: {apparelNo.color}</p>
      <p>Size: 
        <select 
            onChange={(e) => {
                const selectedSize = e.target.value;
                setSize(selectedSize);
            }}>
            <option value="">Size</option>
            {apparelNo.size.map((sizeOption, index) => (
                <option key={index} value={sizeOption}>
                    {sizeOption}
                </option>
            ))}
        </select>
      </p>
      <p>Brand: {apparelNo.brand}</p>
      <p>Status: {apparelNo.status}</p>
    </div>
  );
};

export default ApparelList;