import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchProductsListAsync } from "./productSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { addChip, clearChip } from "../../components/Chip/chipSlice";
import { v4 as uuid } from "uuid";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

const ProductsList: React.FC<{ }> = () => {
  
  const dispatch = useAppDispatch();
  const ref = useRef<any>();
  const [filteredList, setFilteredList] = useState<any>([]);

  async function getProductsList() {
    dispatch(fetchProductsListAsync());
  }

  const { products, loading } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    getProductsList()
  },[])

  function mouseEnter(direction : any){
    if(direction === "down"){
        ref.current.style.overflow = 'auto';
    }
  }

  function mouseLeave(){
    ref.current.style.overflow = 'hidden';
  }

  const handleListItemClick = (
    data: any
   ) => {
     dispatch(addChip({...data}));
  };

  const filterBySearch = (event:any) => {
    const query = event.target.value;

    var updatedList = [...products];
    
    updatedList = updatedList.filter((item: any) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };

  useEffect(() => {
    if(products.length > 0) {
      setFilteredList(products);
    }
  },[products])

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
      <List
        sx={{
          width: '100%',
          maxWidth: 380
        }}
      >
       <div className="flex gap-3 justify-center">
          <OutlinedInput
            size="small"
            className="mr-t"
            style={{
              width: '65%',
              marginTop: 5
            }}
            onChange={filterBySearch} 
            placeholder="Search..." 
          />
          <Button 
            size='small'
            onClick={() => {
              dispatch(clearChip([]));
            }}
            style={{
              marginTop: 5
            }} variant="contained">Clear List
          </Button>
        </div>
      {
        loading ? (<div 
          className="flex h-full items-center justify-center">
        <CircularProgress />
      </div>) : filteredList && filteredList.length > 0 ? (
            <>
              {[...filteredList].map((product: any, index: number) => (
                <>
                  <ListItem key={product.id}>
                    <ListItemButton onClick={(e: any) => handleListItemClick({
                        name: product.title, 
                        id: uuid()
                      })}>
                        <ListItemAvatar>
                          <img
                            style={{
                              width: '40px',
                              height: '40px'
                            }}
                            src={product.image}
                            alt="product-image"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={product.title} secondary={product.description} />
                      </ListItemButton >
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </>
          ) 
         : (<></>)
      }
    </List>
    </div>
  );
};

export default ProductsList;
