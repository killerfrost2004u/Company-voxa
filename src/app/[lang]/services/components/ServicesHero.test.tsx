import { render, screen } from '@testing-library/react';
import ServicesHero from './ServicesHero';

describe('ServicesHero Component', () => {
  it('should_render_the_primary_hero_heading', () => {
    // Arrange
    render(<ServicesHero />);

    // Act
    const heading = screen.getByRole('heading', { level: 1 });

    // Assert
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Elevate Your Brand with Our Digital Solutions/i);
  });

  it('should_contain_a_link_to_the_contact_page_to_start_project', () => {
    // Arrange
    render(<ServicesHero />);

    // Act
    const link = screen.getByRole('link', { name: /Start Your Project/i });

    // Assert
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });
});
