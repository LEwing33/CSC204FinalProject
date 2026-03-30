import React from 'react';
import ToCart from './toCart';
import RemoveFromCart from './removeFromCart';

const ApparelList = ({ apparelNo, savedSize, dbId, onRemove, isLoggedIn }) => {
    const [size, setSize] = React.useState(savedSize || "");

    const displayCost = typeof apparelNo.cost === 'number'
        ? apparelNo.cost.toFixed(2)
        : 'N/A';

    const sizeOptions = apparelNo.size_chart || apparelNo.size || [];

    return (
        <div className="ApparelCard">
            <img
                src={apparelNo.imagePath}
                alt={apparelNo.itemName}
            />
            <h3>{apparelNo.itemName}</h3>
            <p>Category: {apparelNo.category}</p>
            <p>Cost: ${displayCost}</p>
            <p>Color: {apparelNo.color}</p>

            {savedSize ? (
                <p><strong>Selected Size: {savedSize}</strong></p>
            ) : (
                <p>Size:
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select a size</option>
                        {sizeOptions.map((sizeOption, index) => (
                            <option key={index} value={sizeOption}>{sizeOption}</option>
                        ))}
                    </select>
                </p>
            )}

            <p>Brand: {apparelNo.brand}</p>
            <p>Status: {apparelNo.status}</p>

            {/* Only show Add to Cart on home page AND when logged in */}
            {!savedSize && (
                isLoggedIn
                    ? <ToCart apparelNo={apparelNo} selectedSize={size} />
                    : <p>Sign in to add to cart</p>
            )}

            {savedSize && (
                <RemoveFromCart itemId={dbId} onRemove={onRemove} />
            )}
        </div>
    );
};

export default ApparelList;
