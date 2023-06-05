import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const CardMain = (props) => {
  return (
    <Button href={props.path}>
      <Card sx={{ width: '250px', height: '275px' }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={props.image} alt={props.title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
};

export default CardMain;
