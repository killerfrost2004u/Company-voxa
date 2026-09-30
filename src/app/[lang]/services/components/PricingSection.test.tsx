import { render, screen } from '@testing-library/react';
import PricingSection from './PricingSection';

describe('PricingSection Component', () => {
  it('should_render_all_three_pricing_tiers', () => {
    // Arrange
    render(<PricingSection />);

    // Act
    const basicHeading = screen.getByRole('heading', { name: /Basic/i });
    const proHeading = screen.getByRole('heading', { name: /Pro/i });
    const enterpriseHeading = screen.getByRole('heading', { name: /Enterprise/i });

    // Assert
    expect(basicHeading).toBeInTheDocument();
    expect(proHeading).toBeInTheDocument();
    expect(enterpriseHeading).toBeInTheDocument();
  });

  it('should_render_the_correct_pricing_values', () => {
    // Arrange
    render(<PricingSection />);

    // Act
    const basicPrice = screen.getByText('$1,500');
    const proPrice = screen.getByText('$3,000');
    const enterprisePrice = screen.getByText('Custom');

    // Assert
    expect(basicPrice).toBeInTheDocument();
    expect(proPrice).toBeInTheDocument();
    expect(enterprisePrice).toBeInTheDocument();
  });
});
