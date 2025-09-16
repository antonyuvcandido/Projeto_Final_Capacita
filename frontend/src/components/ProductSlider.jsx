import React, { useState, useEffect } from 'react';

function ProductSlider() {
    const images = [
        "https://placehold.co/1200x300/3498db/ffffff?text=Ofertas+Especiais",
        "https://placehold.co/1200x300/e74c3c/ffffff?text=Novos+Produtos",
        "https://placehold.co/1200x300/2ecc71/ffffff?text=Promoções"
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('next');
    
    // Auto-rotate slides
    useEffect(() => {
        const interval = setInterval(() => {
        setSlideDirection('next');
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        }, 10000);
        
        return () => clearInterval(interval);
    }, [images.length]);
    
    // Previous and next handlers
    const goToPrevious = () => {
        setSlideDirection('prev');
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    
    const goToNext = () => {
        setSlideDirection('next');
        setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    // Handle direct navigation to a specific slide
    const goToSlide = (index) => {
        setSlideDirection(index > currentIndex ? 'next' : 'prev');
        setCurrentIndex(index);
    };
    
    return (
        <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
            position: 'relative',
            height: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>

            {/* Container do carousel */}
            <div style={{
            display: 'flex',
            height: '100%',
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
            transition: 'transform 0.6s ease-in-out',
            }}>

            {images.map((img, index) => (
                <div 
                key={index}
                style={{
                    width: `${100 / images.length}%`,
                    height: '100%',
                    flexShrink: 0,
                }}
                >
                <img 
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    }}
                />
                </div>
            ))}
            </div>
            
            {/* Setas de navegação */}
            <button 
            onClick={goToPrevious}
            style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.25)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 2
            }}>‹</button>
            
            <button 
            onClick={goToNext}
            style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.25)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 2
            }}>›</button>

            <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2
            }}>
            {images.map((_, index) => (
                <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    cursor: 'pointer'
                }}
                />
            ))}
            </div>
        </div>
        </div>
    );
}

export default ProductSlider;