import React from 'react';
import ToCart from './toCart';
import RemoveFromCart from './/removeFromCart';
import { supabase } from '../supabaseClient';

const ApparelList = ({ apparelNo, savedSize, dbId, onRemove }) => {
    const [size, setSize] = React.useState(savedSize || "");

    return (
      <div className="ApparelCard">
        <img 
          src={apparelNo.imagePath} 
          alt={apparelNo.itemName} 
        />
        <h3>{apparelNo.itemName}</h3>
        <p>Category: {apparelNo.category}</p>
        <p>Cost: ${apparelNo.cost.toFixed(2)}</p>
        <p>Color: {apparelNo.color}</p>

        {/* If savedSize exists, show text. Otherwise, show the dropdown. */}
        {savedSize ? (
           <p><strong>Selected Size: {savedSize}</strong></p>
        ) : (
          <p>Size: 
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Size</option>
              {apparelNo.size.map((sizeOption, index) => (
                <option key={index} value={sizeOption}>{sizeOption}</option>
              ))}
            </select>
          </p>
        )}

        <p>Brand: {apparelNo.brand}</p>
        <p>Status: {apparelNo.status}</p>

        {/* Show Add to Cart ONLY if there is no savedSize (Home Page) */}
        {!savedSize && (
              <ToCart apparelNo={apparelNo} selectedSize={size}/>
        )}

        {/* Use the dbId for deletion and onRemove for refreshing */}
        {savedSize && (
              <RemoveFromCart itemId={dbId} onRemove={onRemove} />
        )}
      </div>
    );
};

export default ApparelList;