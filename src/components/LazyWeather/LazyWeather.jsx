import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

const Weather = lazy(() => import('../Weather/weather'));

const LazyWeather = (props) => {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const element = placeholderRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '500px 0px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={placeholderRef}
      className="weather-placeholder"
    >
      {shouldRender && (
        <Suspense fallback={<p>Loading weather…</p>}>
          <Weather {...props} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyWeather;
