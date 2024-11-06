import { useState, useEffect, useRef, useContext, useCallback } from "react";
import invariant from "invariant";
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from "../../utils/helper";
import MapContext from "../../map-context";

const eventMap = {
  onPlacesChanged: "places_changed",
};

const updaterMap = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
};

function StandaloneSearchBox({
  children,
  bounds,
  options,
  onPlacesChanged,
  onLoad,
  onUnmount,
}) {
  const map = useContext(MapContext);
  const containerElement = useRef(null);
  const [searchBox, setSearchBox] = useState(null);
  const registeredEvents = useRef([]);

  const setSearchBoxCallback = useCallback(() => {
    if (searchBox && onLoad) {
      onLoad(searchBox);
    }
  }, [searchBox, onLoad]);

  useEffect(() => {
    invariant(
      !!google.maps.places,
      'You need to provide libraries={["places"]} prop to <LoadScript /> component',
      google.maps.places
    );

    if (containerElement.current) {
      const input = containerElement.current.querySelector("input");
      if (input) {
        const searchBox = new google.maps.places.SearchBox(input, options);

        registeredEvents.current = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: { bounds, options, onPlacesChanged },
          instance: searchBox,
        });

        setSearchBox(searchBox);
        setSearchBoxCallback();
      }
    }

    return () => {
      if (searchBox) {
        if (onUnmount) {
          onUnmount(searchBox);
        }
        unregisterEvents(registeredEvents.current);
      }
    };
  }, [
    bounds,
    options,
    onPlacesChanged,
    onLoad,
    onUnmount,
    setSearchBoxCallback,
    searchBox,
  ]);

  useEffect(() => {
    if (searchBox) {
      unregisterEvents(registeredEvents.current);

      registeredEvents.current = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: { bounds, options, onPlacesChanged },
        instance: searchBox,
      });
    }
  }, [bounds, options, onPlacesChanged, searchBox]);

  return <div ref={containerElement}>{children}</div>;
}

export default StandaloneSearchBox;
