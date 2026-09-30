import { render, screen } from '@testing-library/react';
import ServiceBlock from './ServiceBlock';

describe('ServiceBlock Component', () => {
  it('should_render_the_service_title_and_description', () => {
    // Arrange
    const props = {
      title: "Test",
      highlightWord: "Service",
      description: "This is a test description.",
      features: ["Feature 1", "Feature 2"],
      imageAlt: "Test Image",
    };

    // Act
    render(<ServiceBlock {...props} />);

    // Assert
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/Test Service/i);
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
  });

  it('should_render_all_provided_features_in_a_list', () => {
    // Arrange
    const features = ["Blazing Fast", "Highly Accessible", "Strictly Typed"];
    
    // Act
    render(
      <ServiceBlock 
        title="Frontend" 
        highlightWord="Dev" 
        description="test" 
        features={features} 
        imageAlt="alt" 
      />
    );

    // Assert
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("Blazing Fast");
  });

  it('should_apply_navy_styling_when_isReversed_is_true', () => {
    // Arrange
    // Act
    const { container } = render(
      <ServiceBlock 
        title="SEO" 
        highlightWord="Mastery" 
        description="test" 
        features={["F1"]} 
        imageAlt="alt" 
        isReversed={true} 
      />
    );

    // Assert
    // The main section should have the navy background class '#043873'
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-[#043873]');
    expect(section).toHaveClass('text-white');
  });
});
