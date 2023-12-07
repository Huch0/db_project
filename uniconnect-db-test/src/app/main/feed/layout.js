import React from 'react';

export default function FeedLayout({ children }) {
    return (
        <div style={styles.container}>
            {children}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
        padding: '20px 10px',
    },
};