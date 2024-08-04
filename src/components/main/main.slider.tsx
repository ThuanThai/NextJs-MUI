'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

interface IProps {
    title: string;
    data: ITrackTop[];
}

const MainSlider = (props: IProps) => {
    const { data, title } = props;
    const PreArrow = (props: any) => (
        <Button
            variant="contained"
            sx={{
                position: 'absolute',
                top: '110px',
                border: '1px solid ',
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'white',
                color: 'inherit',
                minWidth: 30,
                width: 35,
                left: 0,
                '&:hover': {
                    backgroundColor: '#4c5c6c',
                },
            }}
            onClick={props.onClick}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
        </Button>
    );
    const NextArrow = (props: any) => (
        <Button
            onClick={props.onClick}
            sx={{
                position: 'absolute',
                top: '110px',
                border: '1px solid ',
                right: '0',
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'white',
                color: 'inherit',
                minWidth: 30,
                width: 35,
                '&:hover': {
                    backgroundColor: '#4c5c6c',
                },
            }}>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Button>
    );
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        prevArrow: <PreArrow />,
        nextArrow: <NextArrow />,
    };
    return (
        <Box
            sx={{
                '.track': {
                    padding: '10px',
                },
                '.track-title': {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                },
                img: {
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                },
            }}
            className="slider-container">
            <h2>Multiple {title}</h2>
            <Slider {...settings}>
                {data &&
                    data.map((item) => (
                        <div key={item._id} className="track">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                alt=""
                            />
                            <Link
                                style={{
                                    textDecoration: 'unset',
                                    color: 'unset',
                                }}
                                href={`/track/${item?._id}?audio=${item?.trackUrl}&id=${item?._id}`}>
                                <h4 className="track-title">{item.title}</h4>
                            </Link>
                            <h5>{item.description}</h5>
                        </div>
                    ))}
            </Slider>
        </Box>
    );
};

export default MainSlider;
