declare namespace H {
  namespace service {
    interface ServiceResult {
      items: Array<{
        position: {
          lat: number;
          lng: number;
        };
      }>;
    }
  }

  namespace mapevents {
    interface Event {
      currentPointer: H.util.Event & {
        viewportX: number;
        viewportY: number;
      };
    }
  }

  namespace util {
    interface Event {
      viewportX?: number;
      viewportY?: number;
    }
  }
}
