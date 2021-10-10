#include <Flash.h>

String readFlash() {
  int count = 1;
  int pageSize = Flash.page_size();
  String result = "";
  String finalRes = "";
  while (1) {
    uint32_t *page = Flash.page_address(Flash.page_count() - count);
    for (int pageIterator = 1; pageIterator < pageSize / 4; pageIterator++) {
      String tmp = "";
      unsigned long data = *(page + pageSize / 4 - pageIterator);
      if (data == 0xFFFFFFFF) goto out;
      int toAnd = 0xFF;
      for (int i = 0; i < 4; i++) {
        char res = data & toAnd;
        data >>= 8;
        if (res != 0xFF) tmp += res;
      }
      result = tmp + result;
      if (result.length() >= 16) {
        finalRes += result;
        result = "";
      }
    }
    count++;
  }
  out:
  finalRes += result;
  return finalRes;
}

void setup() {
  Serial.begin(9600);
  Serial.println(readFlash());
}

void loop() {
  yield();
}
