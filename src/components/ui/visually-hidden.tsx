export const VisuallyHidden: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
    <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(1px, 1px, 1px, 1px)' }} {...props}>
      {children}
    </div>
  );