import React from 'react';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './Tutorial.css'; // Import the CSS file

function Tutorial() {
    const buttons = [
        { label: 'Estadísticas', link: '/stats' }
    ];

    return (
        <>
            <div className='grid-container-inicio'>
                <Sidebar />
                <div className='navbar'>
                    <NavbarUser buttons={buttons} />
                </div>
                <div className='video-container'>
                    <iframe
                        title="YouTube Video"
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/JH6wmvLXjBk"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </>
    );
}

export default Tutorial;
