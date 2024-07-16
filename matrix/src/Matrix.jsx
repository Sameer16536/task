import React, { useState, useCallback } from 'react';

const Matrix = () => {
    //9 Boxes ====> 3x3 matrix
    const [boxes, setBoxes] = useState(Array(9).fill('white'));
    //Track order of the clicks
    const [clickOrder, setClickOrder] = useState([]);

    //As a prevention to avoid Clicks during color change
    const [isChanging, setIsChanging] = useState(false);

    const handleClick = useCallback((index) => {
        if (isChanging) {
            return
        }
        //If only 9th box is left-->
        if (clickOrder.length === 8) {
            setIsChanging(true);
            const fullOrder = [...clickOrder, index]

            const changeColors = (i = 0) => {
                if (i < fullOrder.length) {
                    setTimeout(() => {
                        setBoxes(prev => {
                            const newBoxes = [...prev];
                            newBoxes[fullOrder[i]] = 'orange'
                            return newBoxes
                        });
                        changeColors(i + 1)
                    }, 300)
                } else {
                    setIsChanging(false)
                }
            };
            changeColors();
        } else {
            setBoxes(prev => {
                const newBoxes = [...prev]
                newBoxes[index] = 'green'
                return newBoxes;
            });
            setClickOrder(prev => [...prev, index])
        }
    }, [clickOrder, isChanging])

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-800">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Color Changing Matrix</h1>
                <div className="grid grid-cols-3 gap-4 w-64 sm:w-80">
                    {boxes.map((color, index) => (
                        <div key={index} onClick={() => handleClick(index)}
                            className={`
                h-20 sm:h-24 rounded-md shadow-md transition-all duration-300 ease-in-out
                ${color === 'white' ? 'bg-white hover:bg-gray-100' : ''}
                ${color === 'green' ? 'bg-green-500' : ''}
                ${color === 'orange' ? 'bg-orange-500' : ''}
                ${isChanging ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Matrix;