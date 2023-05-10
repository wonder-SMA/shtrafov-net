import { FC, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import ArrowIcon from '@/components/elements/ui/icons/ArrowIcon';
import classNames from 'classnames';

type CollapseProps = {
  children?: ReactNode;
  className?: string;
  title?: string;
}

const Collapse: FC<PropsWithChildren<CollapseProps>> = ({ children, className = '', title }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const collapseClass = classNames({
    collapse: true,
    [className]: className,
    collapsed: isCollapsed,
  });

  const clickHandler = useCallback(() => setIsCollapsed(prevState => !prevState), []);

  return (
    <>
      <div className={collapseClass}>
        <div className="collapse__header" onClick={clickHandler}>
          <ArrowIcon isRotate={isCollapsed} />
          {title}
        </div>
        <div className="collapse__body">
          {children}
        </div>
      </div>

      <style jsx>
        {`
          .collapse {
            width: 100%;

            .collapse__header {
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              gap: 0.5rem;
              color: inherit;
              cursor: pointer;
              user-select: none;
            }

            .collapse__body {
              width: 100%;
              visibility: ${isCollapsed ? 'hidden' : 'visible'};
              height: ${isCollapsed ? '0' : 'auto'};
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: start;
              padding: 1rem 0.5rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Collapse;
