import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import '../LevelOverviewStyles.scss';

const LevelCard = ({ title, summary, image }) => {
    return (
        <div className='card-wrapper'>
            <Card className='card-responsive'>
                    {image && (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={`Image of ${title}`}
                        />
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {summary}
                        </Typography>
                    </CardContent>
            </Card>
        </div>

    );
};

export default LevelCard;
