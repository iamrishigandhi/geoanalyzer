import React from 'react';

interface MeasurementToolsProps {
    activeTool: 'none' | 'distance' | 'angle' | 'comment';
    onToolChange: (tool: 'none' | 'distance' | 'angle' | 'comment') => void;
    onClear: () => void;
}

export function MeasurementTools({ activeTool, onToolChange, onClear }: MeasurementToolsProps) {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Measurement Tools</h3>
            <button
                onClick={() => onToolChange(activeTool === 'distance' ? 'none' : 'distance')}
                style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: activeTool === 'distance' ? '#007bff' : '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Measure Distance
            </button>
            <button
                onClick={() => onToolChange(activeTool === 'angle' ? 'none' : 'angle')}
                style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: activeTool === 'angle' ? '#007bff' : '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                }}
            >
                Measure Angle
            </button>
            <button
                onClick={onClear}
                style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                }}
            >
                Clear Measurements
            </button>
        </div>
    );
}
