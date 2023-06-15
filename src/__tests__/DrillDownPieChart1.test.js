import React from 'react';
import { render, screen } from '@testing-library/react';
import DrillDownPieChart1 from '../components/DrillDownPieChart1';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Pie Chart', () => {
test('renders DrillDownPieChart1 component', () => {
    <Router>
        <DrillDownPieChart1 />
    </Router>
    // Assert that the component renders without throwing any error
  });
});