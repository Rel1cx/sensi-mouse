#include <CoreFoundation/CoreFoundation.h>
#include <IOKit/IOKitLib.h>
#include <IOKit/hidsystem/IOHIDLib.h>
#include <IOKit/hidsystem/IOHIDParameter.h>
#include <IOKit/hidsystem/event_status_driver.h>
#include <assert.h>
#include <stdint.h>
#include <stdio.h>

extern int getPointerResolution() {
  NXEventHandle hdl = NXOpenEventStatus();

  uint32_t res = 0;
  IOByteCount resByteSize = sizeof(res);

  int ret = IOHIDGetParameter(hdl, CFSTR(kIOHIDPointerResolutionKey), (IOByteCount)sizeof(res), &res, &resByteSize);

  NXCloseEventStatus(hdl);

  return KERN_SUCCESS == ret ? res : -1;
}

extern int getMouseAcceleration() {
  NXEventHandle hdl = NXOpenEventStatus();

  uint32_t acc = 0;
  IOByteCount accByteSize = sizeof(acc);

  int ret = IOHIDGetParameter(hdl, CFSTR(kIOHIDMouseAccelerationType), (IOByteCount)sizeof(acc), &acc, &accByteSize);

  NXCloseEventStatus(hdl);

  return KERN_SUCCESS == ret ? acc : -1;
}

extern int setPointerResolution(uint32_t res) {
  NXEventHandle hdl = NXOpenEventStatus();

  int ret = IOHIDSetParameter(hdl, CFSTR(kIOHIDPointerResolutionKey), &res, sizeof(res));

  NXCloseEventStatus(hdl);

  return ret;
}

extern int setMouseAcceleration(uint32_t acc) {
  NXEventHandle hdl = NXOpenEventStatus();

  int ret = IOHIDSetParameter(hdl, CFSTR(kIOHIDMouseAccelerationType), &acc, sizeof(acc));

  NXCloseEventStatus(hdl);

  return ret;
}