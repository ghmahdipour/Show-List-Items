import React, { useRef } from "react";
import Chip from '@mui/material/Chip';
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeChip } from "../../components/Chip/chipSlice";

const MyChip: React.FC<{ }> = () => {

  const dispatch = useAppDispatch();
  const ref = useRef<any>();
  const { chips } = useAppSelector(
    (state) => state.chip
  );
  
  const handleDelete = (data: any, id: any) => {
    dispatch(removeChip({...data, id}))
  };

  function mouseEnter(direction : any){
    if(direction === "down"){
      ref.current.style.overflow = 'auto';
    }
  }

  function mouseLeave(){
    ref.current.style.overflow = 'hidden';
  }

  return (
    <div 
      ref={ref} 
      onMouseOver={() => mouseEnter('down')} 
      onMouseLeave={() => mouseLeave()}
      className="relative bg-white w-full overflow-hidden rounded-lg"
      style={{
        maxWidth: 400,
        height: '40rem',
        maxHeight: '40rem',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: 380
        }}
      >
        {chips.length > 0 && (
            <p>Tap to delete</p>
          )
        }
        {
          chips.map((chip: any, index: number) => (
            <Chip 
              color="primary"
              variant="filled"
              size="medium"
              key={index} 
              label={chip.name} 
              onClick={() => handleDelete(chip, chip.id)}
              style={{margin: '5px'}}
            />
          ))
        }
      </div>
    </div>
  );
};

export default MyChip;
