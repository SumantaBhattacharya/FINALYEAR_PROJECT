import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorStrangeImage from '../../assets/e75d183da831b9c2b46d7a0968c87226.jpg';
import captainImage from '../../assets/image.png';

const FavCard = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const navigate = useNavigate();

  const posts = [
    {
      id: 'doctor-strange',
      title: 'Doctor Strange',
      category: 'Marvel',
      imageUrl: doctorStrangeImage,
    },
    {
      id: 'captain',
      title: 'Captain America',
      category: 'Marvel',
      imageUrl: captainImage,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width <= 1024 && screenSize.width > 768;

  const styles = {
    case: {
      padding: isMobile ? '20px 20px' : isTablet ? '30px 40px' : '40px 65px',
      marginTop: isMobile ? '30px' : '70px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: isMobile ? '20px' : 0,
    },
    heading4: {
      fontSize: isMobile ? '18px' : isTablet ? '20px' : '20px',
      fontWeight: 500,
    },
    heading5: {
      fontSize: isMobile ? '18px' : isTablet ? '20px' : '20px',
      fontWeight: 500,
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '20px' : '40px',
    },
    line: {
      height: '2px',
      width: isMobile ? '80px' : isTablet ? '120px' : '160px',
      backgroundColor: 'black',
    },
    projects: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '20px' : isTablet ? '30px 40px' : '40px 65px',
      gap: isMobile ? '40px' : isTablet ? '60px' : '80px',
    },
    elem: {
      width: isMobile ? '100%' : '50%',
    },
    elemImg: {
      height: isMobile ? '300px' : isTablet ? '400px' : '650px',
      backgroundColor: 'rgb(211, 227, 227)',
      width: '100%',
      borderRadius: '30px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 0',
    },
    bottomIcon: {
      padding: isMobile ? '10px 20px' : '15px 30px',
      fontSize: isMobile ? '16px' : '20px',
      border: '2px solid black',
      borderRadius: '50px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    bottomTitle: {
      fontSize: isMobile ? '24px' : isTablet ? '28px' : '30px',
      fontWeight: 600,
    },
    bottomSubtitle: {
      fontSize: isMobile ? '16px' : '20px',
      fontWeight: 500,
      marginBottom: '10px',
      color: 'gray',
    },
  };

  const getIconStyle = (index) => ({
    ...styles.bottomIcon,
    backgroundColor: hoveredIcon === index ? 'black' : 'transparent',
    color: hoveredIcon === index ? '#fff' : 'black',
  });

  const handleIconClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div 
    className='mb-4'
    >
      <div style={styles.case}>
        <div>
          <h4 style={styles.heading4}>Case Studies</h4>
        </div>
        <div style={styles.right}>
          <div style={styles.line}></div>
          <h5 style={styles.heading5}>
            {posts.length > 0 ? `0${posts.length}` : '00'}
          </h5>
        </div>
      </div>

      <div style={styles.projects}>
        {posts.map((post, index) => (
          <div style={styles.elem} key={post.id}>
            <div
              style={{
                ...styles.elemImg,
                backgroundImage: `url(${post.imageUrl})`
              }}
            ></div>
            <div style={styles.bottom}>
              <div>
                <h2 style={styles.bottomTitle}>{post.title}</h2>
                <h4 style={styles.bottomSubtitle}>{post.category || 'No category'}</h4>
              </div>
              <i
                className="ri-arrow-right-line"
                style={getIconStyle(index)}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
                onClick={() => handleIconClick(post.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavCard;