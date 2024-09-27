"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var xgame;
(function (xgame) {
    /**
    * @language en_US
    * The Base64Util class provides methods for encoding and decoding base64.
    * @version Egret 2.4
    * @platform Web,Native
    * @includeExample egret/utils/Base64Util.ts
    */
    /**
     * @language zh_CN
     * Base64Util 类提供用于编解码base64的方法。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/Base64Util.ts
     */
    var Base64Util = /** @class */ (function () {
        function Base64Util() {
        }
        /**
         * @language en_US
         * encode base64.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 编码base64。
         * @version Egret 2.4
         * @platform Web,Native
         */
        Base64Util.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer);
            var len = bytes.length;
            var base64 = '';
            for (var i = 0; i < len; i += 3) {
                base64 += chars[bytes[i] >> 2];
                base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                base64 += chars[bytes[i + 2] & 63];
            }
            if ((len % 3) === 2) {
                base64 = base64.substring(0, base64.length - 1) + '=';
            }
            else if (len % 3 === 1) {
                base64 = base64.substring(0, base64.length - 2) + '==';
            }
            return base64;
        };
        /**
         * @language en_US
         * decode base64.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 解码base64。
         * @version Egret 2.4
         * @platform Web,Native
         */
        Base64Util.decode = function (base64) {
            var bufferLength = base64.length * 0.75;
            var len = base64.length;
            var p = 0;
            var encoded1 = 0;
            var encoded2 = 0;
            var encoded3 = 0;
            var encoded4 = 0;
            if (base64[base64.length - 1] === '=') {
                bufferLength--;
                if (base64[base64.length - 2] === '=') {
                    bufferLength--;
                }
            }
            var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
            for (var i = 0; i < len; i += 4) {
                encoded1 = lookup[base64.charCodeAt(i)];
                encoded2 = lookup[base64.charCodeAt(i + 1)];
                encoded3 = lookup[base64.charCodeAt(i + 2)];
                encoded4 = lookup[base64.charCodeAt(i + 3)];
                bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
            }
            return arraybuffer;
        };
        Base64Util.string2Uint8Array = function (str) {
            var buf = new ArrayBuffer(str.length);
            var bufView = new Uint8Array(buf);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i) & 0xff; //只取地8位
            }
            return buf;
        };
        return Base64Util;
    }());
    xgame.Base64Util = Base64Util;
})(xgame || (xgame = {}));
/**
 * @private
 */
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
/**
 * @private
 */
var lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
var xgame;
(function (xgame) {
    /**
     * The Endian class contains values that denote the byte order used to represent multibyte numbers.
     * The byte order is either bigEndian (most significant byte first) or littleEndian (least significant byte first).
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
     * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var Endian = /** @class */ (function () {
        function Endian() {
        }
        /**
         * Indicates the least significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte). The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示多字节数字的最低有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Endian.LITTLE_ENDIAN = "littleEndian";
        /**
         * Indicates the most significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte).  The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示多字节数字的最高有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Endian.BIG_ENDIAN = "bigEndian";
        return Endian;
    }());
    xgame.Endian = Endian;
    /**
     * The ByteArray class provides methods and attributes for optimized reading and writing as well as dealing with binary data.
     * Note: The ByteArray class is applied to the advanced developers who need to access data at the byte layer.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     * @language en_US
     */
    /**
     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
     * 注意：ByteArray 类适用于需要在字节层访问数据的高级开发人员。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     * @language zh_CN
     */
    var ByteArray = /** @class */ (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ByteArray(buffer, bufferExtSize) {
            if (bufferExtSize === void 0) { bufferExtSize = 0; }
            /**
             * @private
             */
            this.bufferExtSize = 0; //Buffer expansion size
            /**
             * @private
             */
            this.EOF_byte = -1;
            /**
             * @private
             */
            this.EOF_code_point = -1;
            if (bufferExtSize < 0) {
                bufferExtSize = 0;
            }
            this.bufferExtSize = bufferExtSize;
            var bytes, wpos = 0;
            if (buffer) { //有数据，则可写字节数从字节尾开始
                var uint8 = void 0;
                if (buffer instanceof Uint8Array) {
                    uint8 = buffer;
                    wpos = buffer.length;
                }
                else {
                    wpos = buffer.byteLength;
                    uint8 = new Uint8Array(buffer);
                }
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
            }
            else {
                bytes = new Uint8Array(bufferExtSize);
            }
            this.write_position = wpos;
            this._position = 0;
            this._bytes = bytes;
            this.data = new DataView(bytes.buffer);
            this.endian = Endian.BIG_ENDIAN;
        }
        Object.defineProperty(ByteArray.prototype, "endian", {
            /**
             * Changes or reads the byte order; egret.EndianConst.BIG_ENDIAN or egret.EndianConst.LITTLE_EndianConst.
             * @default egret.EndianConst.BIG_ENDIAN
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 更改或读取数据的字节顺序；egret.EndianConst.BIG_ENDIAN 或 egret.EndianConst.LITTLE_ENDIAN。
             * @default egret.EndianConst.BIG_ENDIAN
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$endian == 0 /* LITTLE_ENDIAN */ ? Endian.LITTLE_ENDIAN : Endian.BIG_ENDIAN;
            },
            set: function (value) {
                this.$endian = value == Endian.LITTLE_ENDIAN ? 0 /* LITTLE_ENDIAN */ : 1 /* BIG_ENDIAN */;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        ByteArray.prototype.setArrayBuffer = function (buffer) {
        };
        Object.defineProperty(ByteArray.prototype, "readAvailable", {
            /**
             * 可读的剩余字节数
             *
             * @returns
             *
             * @memberOf ByteArray
             */
            get: function () {
                return this.write_position - this._position;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "buffer", {
            get: function () {
                return this.data.buffer.slice(0, this.write_position);
            },
            /**
             * @private
             */
            set: function (value) {
                var wpos = value.byteLength;
                var uint8 = new Uint8Array(value);
                var bufferExtSize = this.bufferExtSize;
                var bytes;
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
                this.write_position = wpos;
                this._bytes = bytes;
                this.data = new DataView(bytes.buffer);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "rawBuffer", {
            get: function () {
                return this.data.buffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "bytes", {
            get: function () {
                return this._bytes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "dataView", {
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.data;
            },
            /**
             * @private
             */
            set: function (value) {
                this.buffer = value.buffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "bufferOffset", {
            /**
             * @private
             */
            get: function () {
                return this.data.byteOffset;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "position", {
            /**
             * The current position of the file pointer (in bytes) to move or return to the ByteArray object. The next time you start reading reading method call in this position, or will start writing in this position next time call a write method.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                if (value > this.write_position) {
                    this.write_position = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "length", {
            /**
             * The length of the ByteArray object (in bytes).
                      * If the length is set to be larger than the current length, the right-side zero padding byte array.
                      * If the length is set smaller than the current length, the byte array is truncated.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * ByteArray 对象的长度（以字节为单位）。
             * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
             * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.write_position;
            },
            set: function (value) {
                this.write_position = value;
                if (this.data.byteLength > value) {
                    this._position = value;
                }
                this._validateBuffer(value);
            },
            enumerable: false,
            configurable: true
        });
        ByteArray.prototype._validateBuffer = function (value) {
            if (this.data.byteLength < value) {
                var be = this.bufferExtSize;
                var tmp = void 0;
                if (be == 0) {
                    tmp = new Uint8Array(value);
                }
                else {
                    var nLen = ((value / be >> 0) + 1) * be;
                    tmp = new Uint8Array(nLen);
                }
                tmp.set(this._bytes);
                this._bytes = tmp;
                this.data = new DataView(tmp.buffer);
            }
        };
        Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
            /**
             * The number of bytes that can be read from the current position of the byte array to the end of the array data.
             * When you access a ByteArray object, the bytesAvailable property in conjunction with the read methods each use to make sure you are reading valid data.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
             * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.data.byteLength - this._position;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Clears the contents of the byte array and resets the length and position properties to 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.clear = function () {
            var buffer = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(buffer);
            this._bytes = new Uint8Array(buffer);
            this._position = 0;
            this.write_position = 0;
        };
        /**
         * Read a Boolean value from the byte stream. Read a simple byte. If the byte is non-zero, it returns true; otherwise, it returns false.
         * @return If the byte is non-zero, it returns true; otherwise, it returns false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
         * @return 如果字节不为零，则返回 true，否则返回 false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readBoolean = function () {
            if (this.validate(1 /* SIZE_OF_BOOLEAN */))
                return !!this._bytes[this.position++];
            return false;
        };
        /**
         * Read signed bytes from the byte stream.
         * @return An integer ranging from -128 to 127
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readByte = function () {
            if (this.validate(1 /* SIZE_OF_INT8 */))
                return this.data.getInt8(this.position++);
            return undefined;
        };
        /**
         * Read data byte number specified by the length parameter from the byte stream. Starting from the position specified by offset, read bytes into the ByteArray object specified by the bytes parameter, and write bytes into the target ByteArray
         * @param bytes ByteArray object that data is read into
         * @param offset Offset (position) in bytes. Read data should be written from this position
         * @param length Byte number to be read Default value 0 indicates reading all available data
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            if (!bytes) { //由于bytes不返回，所以new新的无意义
                return;
            }
            var pos = this._position;
            var available = this.write_position - pos;
            if (available < 0) {
                console.error(1025);
                return;
            }
            if (length == 0) {
                length = available;
            }
            else if (length > available) {
                console.error(1025);
                return;
            }
            var position = bytes._position;
            bytes._position = 0;
            bytes.validateBuffer(offset + length);
            bytes._position = position;
            bytes._bytes.set(this._bytes.subarray(pos, pos + length), offset);
            this.position += length;
        };
        /**
         * Read an IEEE 754 double-precision (64 bit) floating point number from the byte stream
         * @return Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
         * @return 双精度（64 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readDouble = function () {
            if (this.validate(8 /* SIZE_OF_FLOAT64 */)) {
                var value = this.data.getFloat64(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 8 /* SIZE_OF_FLOAT64 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read an IEEE 754 single-precision (32 bit) floating point number from the byte stream
         * @return Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readFloat = function () {
            if (this.validate(4 /* SIZE_OF_FLOAT32 */)) {
                var value = this.data.getFloat32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_FLOAT32 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read a 32-bit signed integer from the byte stream.
         * @return A 32-bit signed integer ranging from -2147483648 to 2147483647
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readInt = function () {
            if (this.validate(4 /* SIZE_OF_INT32 */)) {
                var value = this.data.getInt32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_INT32 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read a 16-bit signed integer from the byte stream.
         * @return A 16-bit signed integer ranging from -32768 to 32767
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个带符号的 16 位整数
         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readShort = function () {
            if (this.validate(2 /* SIZE_OF_INT16 */)) {
                var value = this.data.getInt16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 2 /* SIZE_OF_INT16 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read unsigned bytes from the byte stream.
         * @return A 32-bit unsigned integer ranging from 0 to 255
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的 32 位无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedByte = function () {
            if (this.validate(1 /* SIZE_OF_UINT8 */))
                return this._bytes[this.position++];
            return undefined;
        };
        /**
         * Read a 32-bit unsigned integer from the byte stream.
         * @return A 32-bit unsigned integer ranging from 0 to 4294967295
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedInt = function () {
            if (this.validate(4 /* SIZE_OF_UINT32 */)) {
                var value = this.data.getUint32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_UINT32 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read a 16-bit unsigned integer from the byte stream.
         * @return A 16-bit unsigned integer ranging from 0 to 65535
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个无符号的 16 位整数
         * @return 介于 0 和 65535 之间的 16 位无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedShort = function () {
            if (this.validate(2 /* SIZE_OF_UINT16 */)) {
                var value = this.data.getUint16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 2 /* SIZE_OF_UINT16 */;
                return value;
            }
            return undefined;
        };
        /**
         * Read a UTF-8 character string from the byte stream Assume that the prefix of the character string is a short unsigned integer (use byte to express length)
         * @return UTF-8 character string
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUTF = function () {
            var length = this.readUnsignedShort();
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        /**
         * Read a UTF-8 byte sequence specified by the length parameter from the byte stream, and then return a character string
         * @param Specify a short unsigned integer of the UTF-8 byte length
         * @return A character string consists of UTF-8 bytes of the specified length
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUTFBytes = function (length) {
            if (!this.validate(length)) {
                return undefined;
            }
            var data = this.data;
            var bytes = new Uint8Array(data.buffer, data.byteOffset + this._position, length);
            this.position += length;
            return this.decodeUTF8(bytes);
        };
        /**
         * Write a Boolean value. A single byte is written according to the value parameter. If the value is true, write 1; if the value is false, write 0.
         * @param value A Boolean value determining which byte is written. If the value is true, write 1; if the value is false, write 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeBoolean = function (value) {
            this.validateBuffer(1 /* SIZE_OF_BOOLEAN */);
            this._bytes[this.position++] = +value;
        };
        /**
         * Write a byte into the byte stream
         * The low 8 bits of the parameter are used. The high 24 bits are ignored.
         * @param value A 32-bit integer. The low 8 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeByte = function (value) {
            this.validateBuffer(1 /* SIZE_OF_INT8 */);
            this._bytes[this.position++] = value & 0xff;
        };
        /**
         * Write the byte sequence that includes length bytes in the specified byte array, bytes, (starting at the byte specified by offset, using a zero-based index), into the byte stream
         * If the length parameter is omitted, the default length value 0 is used and the entire buffer starting at offset is written. If the offset parameter is also omitted, the entire buffer is written
         * If the offset or length parameter is out of range, they are clamped to the beginning and end of the bytes array.
         * @param bytes ByteArray Object
         * @param offset A zero-based index specifying the position into the array to begin writing
         * @param length An unsigned integer specifying how far into the buffer to write
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
         * @param bytes ByteArray 对象
         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
         * @param length 一个无符号整数，表示在缓冲区中的写入范围
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);
                this._bytes.set(bytes._bytes.subarray(offset, offset + writeLength), this._position);
                this.position = this._position + writeLength;
            }
        };
        /**
         * Write an IEEE 754 double-precision (64 bit) floating point number into the byte stream
         * @param value Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeDouble = function (value) {
            this.validateBuffer(8 /* SIZE_OF_FLOAT64 */);
            this.data.setFloat64(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 8 /* SIZE_OF_FLOAT64 */;
        };
        /**
         * Write an IEEE 754 single-precision (32 bit) floating point number into the byte stream
         * @param value Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeFloat = function (value) {
            this.validateBuffer(4 /* SIZE_OF_FLOAT32 */);
            this.data.setFloat32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_FLOAT32 */;
        };
        /**
         * Write a 32-bit signed integer into the byte stream
         * @param value An integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeInt = function (value) {
            this.validateBuffer(4 /* SIZE_OF_INT32 */);
            this.data.setInt32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_INT32 */;
        };
        /**
         * Write a 16-bit integer into the byte stream. The low 16 bits of the parameter are used. The high 16 bits are ignored.
         * @param value A 32-bit integer. Its low 16 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
         * @param value 32 位整数，该整数的低 16 位将被写入字节流
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeShort = function (value) {
            this.validateBuffer(2 /* SIZE_OF_INT16 */);
            this.data.setInt16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_INT16 */;
        };
        /**
         * Write a 32-bit unsigned integer into the byte stream
         * @param value An unsigned integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个无符号的 32 位整数
         * @param value 要写入字节流的无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUnsignedInt = function (value) {
            this.validateBuffer(4 /* SIZE_OF_UINT32 */);
            this.data.setUint32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_UINT32 */;
        };
        /**
         * Write a 16-bit unsigned integer into the byte stream
         * @param value An unsigned integer to be written into the byte stream
         * @version Egret 2.5
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个无符号的 16 位整数
         * @param value 要写入字节流的无符号整数
         * @version Egret 2.5
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUnsignedShort = function (value) {
            this.validateBuffer(2 /* SIZE_OF_UINT16 */);
            this.data.setUint16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_UINT16 */;
        };
        /**
         * Write a UTF-8 string into the byte stream. The length of the UTF-8 string in bytes is written first, as a 16-bit integer, followed by the bytes representing the characters of the string
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(2 /* SIZE_OF_UINT16 */ + length);
            this.data.setUint16(this._position, length, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_UINT16 */;
            this._writeUint8Array(utf8bytes, false);
        };
        /**
         * Write a UTF-8 string into the byte stream. Similar to the writeUTF() method, but the writeUTFBytes() method does not prefix the string with a 16-bit length word
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
        };
        /**
         *
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        ByteArray.prototype.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        };
        /**
         * @private
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        ByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            var pos = this._position;
            var npos = pos + bytes.length;
            if (validateBuffer) {
                this.validateBuffer(npos);
            }
            this.bytes.set(bytes, pos);
            this.position = npos;
        };
        /**
         * @param len
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        ByteArray.prototype.validate = function (len) {
            var bl = this._bytes.length;
            if (bl > 0 && this._position + len <= bl) {
                return true;
            }
            else {
                console.error(1025);
            }
            return false;
        };
        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        /**
         * @private
         * @param len
         * @param needReplace
         */
        ByteArray.prototype.validateBuffer = function (len) {
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            this._validateBuffer(len);
        };
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        ByteArray.prototype.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count = void 0, offset = void 0;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }
                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        /**
         * @private
         *
         * @param data
         * @returns
         */
        ByteArray.prototype.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte == this.EOF_byte) {
                    if (utf8_bytes_needed != 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed == 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            }
                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            }
                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)
                            result += String.fromCharCode(code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                        result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        /**
         * @private
         *
         * @param code_point
         */
        ByteArray.prototype.encoderError = function (code_point) {
            console.error(1026, code_point);
        };
        /**
         * @private
         *
         * @param fatal
         * @param opt_code_point
         * @returns
         */
        ByteArray.prototype.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
                console.error(1027);
            }
            return opt_code_point || 0xFFFD;
        };
        /**
         * @private
         *
         * @param a
         * @param min
         * @param max
         */
        ByteArray.prototype.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        /**
         * @private
         *
         * @param n
         * @param d
         */
        ByteArray.prototype.div = function (n, d) {
            return Math.floor(n / d);
        };
        /**
         * @private
         *
         * @param string
         */
        ByteArray.prototype.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else { // (inRange(c, 0xD800, 0xDBFF))
                    if (i == n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        return ByteArray;
    }());
    xgame.ByteArray = ByteArray;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var TimeUitls = /** @class */ (function () {
        function TimeUitls() {
        }
        /**
         * 是否是同一天
         * @param timeA 时间A
         * @param timeB 时间B
         * @returns true 表示同一天 false 反之
         */
        TimeUitls.isSameDay = function (timeA, timeB) {
            var dataA = new Date(timeA);
            var dataB = new Date(timeB);
            return dataA.getFullYear() == dataB.getFullYear() &&
                dataA.getMonth() == dataB.getMonth() &&
                dataA.getDate() == dataB.getDate();
        };
        /**
         * 俩个时间之间有多少天
         * @param timeA 时间A
         * @param timeB 时间B
         * @returns true 表示天数差距
         */
        TimeUitls.getDayCount = function (timeA, timeB) {
            var dataA = new Date(timeA);
            var dataB = new Date(timeB);
            dataA.setHours(0);
            dataA.setMinutes(0);
            dataA.setSeconds(0);
            dataA.setMilliseconds(0);
            dataB.setHours(0);
            dataB.setMinutes(0);
            dataB.setSeconds(0);
            dataB.setMilliseconds(0);
            return (dataB.getTime() - dataA.getTime()) / (1000 * 3600 * 24);
        };
        /**
         * 获得两个时间之间完整的天数
         * @param timeA
         * @param timeB
         */
        TimeUitls.getCompleteDaysBetweenTwoTimes = function (srcTimeA, srcTimeB) {
            var timeA = TimeUitls.getNextDayTimeStamp(srcTimeA);
            var timeB = TimeUitls.getCurrentDayTimeStamp(srcTimeB);
            var days = (timeB - timeA) / (1000 * 3600 * 24);
            return days;
        };
        /**
         * 给定时间戳，获取该时间戳当天的凌晨时间
         */
        TimeUitls.getCurrentDayTimeStamp = function (time) {
            var date = new Date(time);
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            var currentDayTime = date.getTime();
            return currentDayTime;
        };
        /**
         * 给定时间戳，获取该时间戳明天的凌晨时间
         */
        TimeUitls.getNextDayTimeStamp = function (time) {
            var date = new Date(time);
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            var nextSatTime = date.getTime() + 24 * 3600 * 1000;
            return nextSatTime;
        };
        /**
         * 给定时间戳，获取该时间戳下一个周六的凌晨时间
         */
        TimeUitls.getNextSatTimestamp = function (time) {
            var date = new Date(time);
            var days = 6 - date.getDay();
            if (days <= 0) {
                days += 7;
            }
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            var nextSatTime = date.getTime() + days * (24 * 3600 * 1000);
            return nextSatTime;
        };
        return TimeUitls;
    }());
    xgame.TimeUitls = TimeUitls;
    /**
     * 引擎初始化时间
     */
    xgame.ccStartTime = 0;
    /**
     * 获取时间
     */
    function getTimer() {
        return Date.now() - xgame.ccStartTime;
    }
    xgame.getTimer = getTimer;
    /**
     * 时间记录器
     */
    var XGameTimer = /** @class */ (function () {
        function XGameTimer() {
            this._timeArr = [];
            this._timeArr.push(Date.now());
        }
        XGameTimer.prototype.showTime = function () {
            var _now = Date.now();
            this._timeArr.push(_now);
            console.log("[XGameTimer] : \u5F53\u524D:" + _now + "ms \u8DDD\u79BB\u4E0A\u6B21:" + (_now - this._timeArr[this._timeArr.length - 2]) + "ms");
        };
        XGameTimer.prototype.showDelay = function () {
            for (var index = 1; index < this._timeArr.length; index++) {
                console.log("[XGameTimer] \u5EF6\u8FDF\u8BB0\u5F55 (" + index + "):" + (this._timeArr[index] - this._timeArr[index - 1]) + "ms");
            }
        };
        return XGameTimer;
    }());
    xgame.XGameTimer = XGameTimer;
})(xgame || (xgame = {}));
/**
 * 合并命名空间
 * @param globalObjName window下对象名字
 * @param fixObj
 */
function fixNameSpace(globalObjName, fixObj) {
    if (!window[globalObjName]) {
        window[globalObjName] = fixObj;
    }
    else {
        xgame.fixData(window[globalObjName], fixObj);
    }
}
/**
 * 监听cocos框架初始化完成，开始初始化游戏引擎框架
 * 游戏代码加载完成后记录时间
 */
cc.game.once(cc.game.EVENT_ENGINE_INITED, function () { return __awaiter(void 0, void 0, void 0, function () {
    var beginTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fixNameSpace('xgame', xgame);
                xgame.fixData(xgame['eventKey'], xgame.eventKey);
                xgame.fixData(xgame['platform'], xgame.platform);
                xgame.fixData(xgame['mgr'], xgame.mgr);
                xgame.fixData(xgame['WXTools'], xgame.WXTools);
                console.log("\u6302\u8F7D xgame \u6A21\u5757\u6210\u529F\uFF01");
                xgame.ccStartTime = xgame.getTimer();
                xgame.openLog && console.log("[XGameCocos] : cocos \u5F15\u64CE\u521D\u59CB\u5316\u5B8C\u6210");
                beginTime = xgame.getTimer();
                xgame.openLog && console.log("[XGameCocos] : \u5F00\u59CB\u521D\u59CB\u5316 xgame");
                xgame.getXGame().init();
                return [4 /*yield*/, xgame.getXGame().waitInit()];
            case 1:
                _a.sent();
                xgame.openLog && console.log("[XGameCocos] : xgame\u6846\u67B6\u521D\u59CB\u5316\u5B8C\u6210 \u8017\u65F6:" + (xgame.getTimer() - beginTime) + " ms");
                return [2 /*return*/];
        }
    });
}); });
var xgame;
(function (xgame) {
    /**
     * @private
     */
    var getDefinitionByNameCache = {};
    /**
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     * @language en_US
     */
    /**
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     * @language zh_CN
     */
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = window;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    xgame.getDefinitionByName = getDefinitionByName;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 适配白鹭 getQualifiedClassName 函数
     */
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__classname__")) {
            return prototype["__classname__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__classname__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    xgame.getQualifiedClassName = getQualifiedClassName;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 适配 egret 函数 getQualifiedSuperclassName
     */
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = xgame.getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    xgame.getQualifiedSuperclassName = getQualifiedSuperclassName;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**log开关 */
    xgame.openLog = true;
    var FormatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    // /**适配log输出 */
    // export function log(msg: any, ...subst: any[]) {
    //     console.log(msg, ...subst);
    // }
    // /**适配log输出 */
    // export function timeLog(msg: any, ...subst: any[]) {
    //     console.log(`[${FormatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S")}] ${msg}`, ...subst);
    // }
    // /**框架输出适配log输出 */
    // export function frameworkLog(msg: any, ...subst: any[]) {
    //     console.log(`[xgame] ${msg}`, ...subst);
    // }
    // /**适配error输出 */
    // export function error(msg: any, ...subst: any[]) {
    //     console.error(msg, ...subst);
    // }
    // /**适配warn输出 */
    // export function warn(msg: any, ...subst: any[]) {
    //     console.warn(msg, ...subst);
    // }
    // function toArray(argument) {
    //     let args = [];
    //     for (let i = 0; i < argument.length; i++) {
    //         args.push(argument[i]);
    //     }
    //     return args;
    // }
    // /**断言 */
    // export function assert(msg: any, ...subst: any[]) {
    //     if (console.assert) {
    //         console.assert.apply(console, toArray(arguments));
    //     } else {
    //         let args = toArray(arguments);
    //         if (!args[0]) {
    //             let args2 = [];
    //             for (let i = 1; i < args.length; i++) {
    //                 args2.push(args[i]);
    //             }
    //             console.error.apply(console, args2);
    //         }
    //     }
    // }
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
    * 系统错误码
    */
    var EErrorCode;
    (function (EErrorCode) {
        EErrorCode[EErrorCode["null"] = 0] = "null";
        EErrorCode[EErrorCode["levelLimit"] = 1] = "levelLimit";
        EErrorCode[EErrorCode["mythEquipLimit"] = 2] = "mythEquipLimit";
        EErrorCode[EErrorCode["extractLevelLimit"] = 3] = "extractLevelLimit";
        EErrorCode[EErrorCode["extractEquipLimit"] = 4] = "extractEquipLimit";
        EErrorCode[EErrorCode["extractQualityLimit"] = 5] = "extractQualityLimit";
        EErrorCode[EErrorCode["extractUniqueLimit"] = 6] = "extractUniqueLimit";
        EErrorCode[EErrorCode["refineLevelLimit"] = 7] = "refineLevelLimit";
    })(EErrorCode = xgame.EErrorCode || (xgame.EErrorCode = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    //框架日志开启关闭配置
    xgame.isDebug = false;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 异步等待时间结果code
     */
    var EnumAsyncEventResultKey;
    (function (EnumAsyncEventResultKey) {
        EnumAsyncEventResultKey[EnumAsyncEventResultKey["Error"] = 0] = "Error";
        EnumAsyncEventResultKey[EnumAsyncEventResultKey["OK"] = 1] = "OK";
    })(EnumAsyncEventResultKey = xgame.EnumAsyncEventResultKey || (xgame.EnumAsyncEventResultKey = {}));
    /**
     * 缓冲数据获取函数
     */
    function cacheData(key) {
        return xgame.getXGame().data.getData(key, xgame.DataType.cache);
    }
    xgame.cacheData = cacheData;
    /**
     * 构建一个数据对象
     */
    function createData(key) {
        return xgame.getXGame().data.getData(key, undefined);
    }
    xgame.createData = createData;
    /**
     * 动态数据数据获取函数
     */
    function dynamicData(key) {
        return xgame.getXGame().data.getData(key, xgame.DataType.dynamic);
    }
    xgame.dynamicData = dynamicData;
    /**
     * 存储数据获取函数
     */
    function localData(key) {
        return xgame.getXGame().data.getData(key, xgame.DataType.local);
    }
    xgame.localData = localData;
    /**
     * 清除缓存数据
     */
    function clearCacheData(key) {
        return xgame.getXGame().data.clearData(key, xgame.DataType.cache);
    }
    xgame.clearCacheData = clearCacheData;
    /**
     * 清除动态数据
     */
    function clearDynamicData(key) {
        return xgame.getXGame().data.clearData(key, xgame.DataType.cache);
    }
    xgame.clearDynamicData = clearDynamicData;
    /**
     * 清除本地数据
     */
    function clearLocalData(key) {
        return xgame.getXGame().data.clearData(key, xgame.DataType.cache);
    }
    xgame.clearLocalData = clearLocalData;
    /**
     * 写入本地数据(默认延迟写入,不是必要情况下使用默认写入方式,避免平凡写入文件出现卡顿现象)
     */
    function saveLocalData(immediately) {
        if (immediately === void 0) { immediately = false; }
        if (immediately) {
            xgame.getXGame().data.writeLocalData();
        }
        else {
            xgame.getXGame().data.delayWriteLocalData();
        }
    }
    xgame.saveLocalData = saveLocalData;
    /**
     * 派发系统事件
     * @param event 时间对象
     * @param upEvent 上游事件
     */
    function dispatchSysEvent(event, upEvent) {
        var serialID = xgame.MathTools.getHashCode();
        if (typeof event == 'number') {
            var eventKey_1 = xgame.EnumSysEvtKey[event] || xSystem.EnumSysEvtKey[event];
            var eventData = { serialID: serialID, key: event };
            if (upEvent) {
                eventData.eventsCode = upEvent.eventsCode;
            }
            eventData.resultCode = 0;
            xgame.getXGame().system.emit(eventKey_1, eventData);
            xgame.getXGame().ui.emit(eventKey_1, eventData);
            return eventData;
        }
        else {
            var eventKey_2 = xgame.EnumSysEvtKey[event.key] || xSystem.EnumSysEvtKey[event.key];
            event.serialID = serialID;
            if (upEvent) {
                event.eventsCode = upEvent.eventsCode;
            }
            event.resultCode = 0;
            xgame.getXGame().system.emit(eventKey_2, event);
            xgame.getXGame().ui.emit(eventKey_2, event);
            return event;
        }
    }
    xgame.dispatchSysEvent = dispatchSysEvent;
    /**
     * 异步派发系统事件 await 可等待时间回应
     * @param event 事件key
     * @param returnKey 等待返回key
     * @param data 提交数据
     * @param waitSecound 等待事件默认10秒，如果10秒没有等到自己的回应协议则返回
     */
    function asyncDispatchSysEvent(event, returnKey, waitSecound) {
        if (waitSecound === void 0) { waitSecound = 10; }
        var self = this;
        return new Promise(function (resolve, reject) {
            var enumValueName = '';
            if (typeof event === 'number') {
                enumValueName = xgame.EnumSysEvtKey[event] || xSystem.EnumSysEvtKey[event];
            }
            else {
                enumValueName = xgame.EnumSysEvtKey[event.key] || xSystem.EnumSysEvtKey[event.key];
            }
            var returnEnumValueName = xgame.EnumSysEvtKey[returnKey] || xSystem.EnumSysEvtKey[returnKey];
            //超时设置
            var timeoutID = setTimeout(function () {
                xgame.openLog && console.error("[asyncDispatchSysEvent] 10 \u79D2\u6CA1\u6709\u56DE\u5E94\uFF0C\u7B49\u5F85\u81EA\u52A8\u7ED3\u675F key:" + enumValueName + " \u7B49\u5F85Key:" + returnEnumValueName);
                xgame.getXGame().system.off(returnEnumValueName, callback, self);
                resolve({ code: EnumAsyncEventResultKey.Error, msg: "timeout " + waitSecound + "ms" });
            }, 1000 * waitSecound);
            function callback(rData) {
                clearTimeout(timeoutID);
                xgame.getXGame().system.off(returnEnumValueName, callback, self);
                resolve({ result: rData, code: EnumAsyncEventResultKey.OK });
            }
            xgame.getXGame().system.on(returnEnumValueName, callback, self);
            xgame.dispatchSysEvent(event);
        });
    }
    xgame.asyncDispatchSysEvent = asyncDispatchSysEvent;
    /**
     * 发送网路数据
     * @param event 时间对象
     * @param data 数据体
     * @param isWaitCallBack 是否等待服务器回传数据 默认 等待
     */
    function dispatchNetEvent(key, data, isWaitCallBack) {
        if (data === void 0) { data = {}; }
        if (isWaitCallBack === void 0) { isWaitCallBack = false; }
        data = data ? data : {};
        data.protoID = key;
        data.optHashCode = xgame.MathTools.getHashCode();
        xgame.getXGame().network.send(data, isWaitCallBack);
    }
    xgame.dispatchNetEvent = dispatchNetEvent;
    /**
     *
     * @param key 音乐url路径
     * @param call 音乐播放唯一标识回调
     * @param loop 是否循环
     * @param vol 音量（0-1）
     * @param hashCode
     */
    function playAudio(key, call, loop, vol, hashCode) {
        if (call === void 0) { call = null; }
        if (loop === void 0) { loop = false; }
        if (vol === void 0) { vol = 1; }
        if (hashCode === void 0) { hashCode = xgame.MathTools.getHashCode(); }
        if (key == "" || key == null)
            return;
        xgame.getXGame().audio.playAudio(key, call, loop, vol, hashCode);
    }
    xgame.playAudio = playAudio;
    /**
     * 移除指定的Action
     * @param action 指定的Action
     */
    function removeTargetAction(action) {
        if (!action)
            return;
        var target = action.getOriginalTarget();
        if (!target
            || !target.isValid
            || cc.director.getActionManager().getNumberOfRunningActionsInTarget(target) == 0) {
            return;
        }
        target.stopAction(action);
    }
    xgame.removeTargetAction = removeTargetAction;
    /**
     * 重启游戏
     */
    function reStart() {
        console.warn("\u91CD\u65B0\u542F\u52A8\u7A0B\u5E8F\uFF01native:" + cc.sys.isNative);
        if (cc.sys.isNative) {
            cc.game.restart();
        }
        else if (cc.sys.isBrowser) {
            location.reload();
        }
    }
    xgame.reStart = reStart;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 显示一个View
     */
    function addView(viewName, data, addOver) {
        var type = typeof viewName;
        if (type != "string")
            viewName = xgame.getQualifiedClassName(viewName);
        return xgame.getXGame().ui.addView(xgame.mgr.UIMgr.defaultPath + viewName, data, addOver);
    }
    xgame.addView = addView;
    /**
     * 显示一个View
     */
    function asyncAddView(viewName, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var addOver = function (uuid) {
                            resolve(uuid);
                        };
                        addView(viewName, data, addOver);
                    })];
            });
        });
    }
    xgame.asyncAddView = asyncAddView;
    /**
     * 删除一个View
     */
    function removeView(uuid) {
        return xgame.getXGame().ui.removeView(uuid);
    }
    xgame.removeView = removeView;
    /**
         * 进入指定名字的scene
         * @param sceneName scene名字
         * @param enterOver 进入完成回调
         */
    function enterScene(sceneName, enterOver) {
        xgame.getXGame().ui.clearBoardAndTips();
        cc.director.loadScene(sceneName, enterOver);
    }
    xgame.enterScene = enterScene;
    /**
     * 是否有弹窗或tips
     */
    function isHaveBoardOrTipsOrLayers() {
        return xgame.getXGame().ui.getBoardCount() > 0
            || xgame.getXGame().ui.getTipsCount() > 0
            || xgame.getXGame().ui.hasViewLayer();
    }
    xgame.isHaveBoardOrTipsOrLayers = isHaveBoardOrTipsOrLayers;
    /**
     * 设置图片精灵（安全）
     * @param sprite
     * @param url
     */
    function setSpriteFrame(sprite, url) {
        var _this = this;
        if (!sprite || !url || url == "") {
            // console.error(`[xgame.UIExFunc.setSpriteFrame] 设置精灵为空，或者url不存在 url:${url}`);
            return;
        }
        if (url.substring(0, 4) == "http") {
            var texture2d = cc.loader.getRes(url);
            if (texture2d) {
                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                    sprite.spriteFrame = new cc.SpriteFrame(texture2d);
                }
            }
            else {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var texture2d;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xgame.loadUrl(url)];
                            case 1:
                                texture2d = _a.sent();
                                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture2d);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
        else {
            var spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
            if (spriteFrame) {
                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                    sprite.spriteFrame = spriteFrame;
                }
            }
            else {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var spriteFrame;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xgame.loadRes(url, cc.SpriteFrame)];
                            case 1:
                                spriteFrame = _a.sent();
                                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                                    sprite.spriteFrame = spriteFrame;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
    }
    xgame.setSpriteFrame = setSpriteFrame;
    /**
     * 获取图片精灵（安全）
     * @param sprite
     * @param url
     */
    function getSpriteFrame(url) {
        return __awaiter(this, void 0, void 0, function () {
            var res_spriteFrame, texture2d, _a, _b, spriteFrame;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        res_spriteFrame = null;
                        if (!url || url == "") {
                            // console.error(`[xgame.UIExFunc.setSpriteFrame] 设置精灵为空，或者url不存在 url:${url}`);
                            return [2 /*return*/, res_spriteFrame];
                        }
                        if (!(url.substring(0, 4) == "http")) return [3 /*break*/, 4];
                        texture2d = cc.loader.getRes(url);
                        if (!texture2d) return [3 /*break*/, 1];
                        res_spriteFrame = new cc.SpriteFrame(texture2d);
                        return [3 /*break*/, 3];
                    case 1:
                        _b = (_a = cc.SpriteFrame).bind;
                        return [4 /*yield*/, xgame.loadUrl(url)];
                    case 2:
                        res_spriteFrame = new (_b.apply(_a, [void 0, _c.sent()]))();
                        _c.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
                        if (!spriteFrame) return [3 /*break*/, 5];
                        res_spriteFrame = spriteFrame;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, xgame.loadRes(url, cc.SpriteFrame)];
                    case 6:
                        res_spriteFrame = _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/, res_spriteFrame];
                }
            });
        });
    }
    xgame.getSpriteFrame = getSpriteFrame;
    /**
     * 添加节点
     * @param sprite
     * @param url
     */
    function addPrefab(root, url) {
        var _this = this;
        if (!root || !url || url == "") {
            // console.error(`[xgame.UIExFunc.addPrefab] 设置精灵为空，或者url不存在 url:${url}`);
            return;
        }
        var node = cc.loader.getRes(url, cc.Prefab);
        if (node) {
            if (root.isValid) {
                root.addChild(cc.instantiate(node));
            }
        }
        else {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, xgame.loadRes(url, cc.Prefab)];
                        case 1:
                            node = _a.sent();
                            if (root.isValid) {
                                root.addChild(cc.instantiate(node));
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    }
    xgame.addPrefab = addPrefab;
    function destoryNodeChildrens(node) {
        if (node) {
            node.destroyAllChildren();
            node.removeAllChildren(true);
        }
    }
    xgame.destoryNodeChildrens = destoryNodeChildrens;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var config;
    (function (config) {
        //游戏名字
        config.GAME_NAME = "";
        //游戏内容版本号
        config.VERSION = "";
        //包版本
        config.NATIVE_VERSION = "";
        //热更新版本
        config.HOT_UPDATE_VERSION = "";
        //游戏渠道
        config.CHANNEL = "";
        //子渠道
        config.SUBCHANNEL = "";
        //平台
        config.PLATFORM = "";
        /**数据统计URL */
        config.BI_URL = "";
        /** 时间服务器 URL */
        config.TS_URL = "";
    })(config = xgame.config || (xgame.config = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var eventKey;
    (function (eventKey) {
        //游戏框架初始化完成
        eventKey.xgame_framework_init = "xgame_framework_init";
        //游戏初始化完成
        eventKey.xgame_game_init = "xgame_game_init";
        //游戏用户初始化完成
        eventKey.xgame_user_init = "xgame_user_init";
        //开始游戏
        eventKey.xgame_game_start = "xgame_game_start";
    })(eventKey = xgame.eventKey || (xgame.eventKey = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 框架事件
     */
    var EnumFrameworkEventKey;
    (function (EnumFrameworkEventKey) {
        EnumFrameworkEventKey["none"] = "none";
        EnumFrameworkEventKey["xgame_error"] = "xgame_error";
    })(EnumFrameworkEventKey = xgame.EnumFrameworkEventKey || (xgame.EnumFrameworkEventKey = {}));
    /**
     * 获取xgame对象
     */
    function getXGame() {
        return XGame.getInstance();
    }
    xgame.getXGame = getXGame;
    /** 游戏平台名称 */
    xgame.platformName = "wx";
    var XGame = /** @class */ (function (_super) {
        __extends(XGame, _super);
        function XGame() {
            var _this = _super.call(this) || this;
            _this.time = null;
            _this._mgrArr = [];
            return _this;
        }
        /**
         * 获取游戏框架对象
         */
        XGame.getInstance = function () {
            if (!XGame.instance) {
                XGame.instance = new XGame();
            }
            return XGame.instance;
        };
        XGame.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.time = {
                                enterBackground: 0,
                                exitBackground: Date.now(),
                                startGameTime: Date.now(),
                                lastUpdateTime: Date.now(),
                                lastRunUpdateTime: Date.now(),
                                isBackground: false,
                            };
                            this._initPromise = this._init();
                            return [4 /*yield*/, this._initPromise];
                        case 1:
                            _a.sent();
                            this.startUpdateHandle();
                            this._initPromise = null;
                            return [2 /*return*/];
                    }
                });
            });
        };
        XGame.prototype.startUpdateHandle = function () {
            var _this = this;
            //启动update
            var intervalDelayTime = 1000 / xgame.XGame.FPS;
            var tmpUpdateCall = function () {
                var lastTime = _this.time.lastUpdateTime;
                _this.time.lastUpdateTime = Date.now();
                var delayTime = (_this.time.lastUpdateTime - lastTime) * 0.001;
                var runDelayTime = 0;
                if (!_this.time.isBackground) {
                    var lastRunTime = _this.time.lastRunUpdateTime;
                    _this.time.lastRunUpdateTime = Date.now();
                    runDelayTime = (_this.time.lastRunUpdateTime - lastRunTime) * 0.001;
                }
                _this.update({
                    dt: delayTime,
                    runDt: runDelayTime
                });
            };
            setInterval(tmpUpdateCall, intervalDelayTime);
        };
        XGame.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var mgrName, mgrObj, startIndex, srcStartIndex, index, tmpMgr, _i, _a, mgr_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.data)
                                return [2 /*return*/];
                            //初始化管理器
                            for (mgrName in xgame.mgr) {
                                mgrObj = new xgame.mgr[mgrName];
                                mgrObj['__classname__'] = mgrName;
                                xgame.openLog && console.log("[xgame._init] \u6784\u5EFA\u7BA1\u7406\u5668 : " + mgrName);
                                this[mgrName.toLowerCase().replace("mgr", "")] = mgrObj;
                                this._mgrArr.push(mgrObj);
                            }
                            startIndex = 0;
                            _b.label = 1;
                        case 1:
                            if (!(startIndex < this._mgrArr.length)) return [3 /*break*/, 6];
                            srcStartIndex = startIndex;
                            index = startIndex;
                            _b.label = 2;
                        case 2:
                            if (!(index < this._mgrArr.length)) return [3 /*break*/, 5];
                            xgame.openLog && console.log("[xgame._init] : \u5C1D\u8BD5\u521D\u59CB\u5316 -> " + this._mgrArr[index]['__classname__']);
                            return [4 /*yield*/, this._mgrArr[index].init()];
                        case 3:
                            if (_b.sent()) {
                                xgame.openLog && console.log("[xgame._init] : \u59CB\u5316\u5B8C\u6210 -> " + this._mgrArr[index]['__classname__']);
                                if (index != startIndex) {
                                    tmpMgr = this._mgrArr[startIndex];
                                    this._mgrArr[startIndex] = this._mgrArr[index];
                                    this._mgrArr[index] = tmpMgr;
                                }
                                startIndex++;
                            }
                            else {
                                xgame.openLog && console.warn("[xgame._init] : \u59CB\u5316\u5931\u8D25 -> " + this._mgrArr[index]['__classname__']);
                            }
                            _b.label = 4;
                        case 4:
                            index++;
                            return [3 /*break*/, 2];
                        case 5:
                            if (srcStartIndex == startIndex) {
                                cc.error("[xgame] - \u6846\u67B6\u521D\u59CB\u5316\u5931\u8D25:\u7BA1\u7406\u5668\u4F9D\u8D56\u5173\u7CFB\u6784\u6210\u6B7B\u5FAA\u73AF!");
                                return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 1];
                        case 6:
                            //启动所有管理器
                            for (_i = 0, _a = this._mgrArr; _i < _a.length; _i++) {
                                mgr_1 = _a[_i];
                                mgr_1.start();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        XGame.prototype.update = function (dtData) {
            for (var _i = 0, _a = this._mgrArr; _i < _a.length; _i++) {
                var mgr_2 = _a[_i];
                mgr_2.onUpdate(dtData);
            }
        };
        /**
         * 等待结果
         */
        XGame.prototype.waitInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._initPromise) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._initPromise];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 单利对象
         */
        XGame.instance = undefined;
        /** 逻辑更新fps */
        XGame.FPS = 50;
        return XGame;
    }(cc.EventTarget));
    xgame.XGame = XGame;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 获取指定数据的MD5值
     * @param data
     */
    function MD5(data) {
        // convert number to (unsigned) 32 bit hex, zero filled string
        function to_zerofilled_hex(n) {
            var t1 = (n >>> 24).toString(16);
            var t2 = (n & 0x00FFFFFF).toString(16);
            return "00".substr(0, 2 - t1.length) + t1 +
                "000000".substr(0, 6 - t2.length) + t2;
        }
        // convert a 64 bit unsigned number to array of bytes. Little endian
        function int64_to_bytes(num) {
            var retval = [];
            for (var i = 0; i < 8; i++) {
                retval.push(num & 0xFF);
                num = num >>> 8;
            }
            return retval;
        }
        //  32 bit left-rotation
        function rol(num, places) {
            return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
        }
        // The 4 MD5 functions
        function fF(b, c, d) {
            return (b & c) | (~b & d);
        }
        function fG(b, c, d) {
            return (d & b) | (~d & c);
        }
        function fH(b, c, d) {
            return b ^ c ^ d;
        }
        function fI(b, c, d) {
            return c ^ (b | ~d);
        }
        // pick 4 bytes at specified offset. Little-endian is assumed
        function bytes_to_int32(arr, off) {
            return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
        }
        // convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
        function int128le_to_hex(a, b, c, d) {
            var ra = "";
            var t = 0;
            var ta = 0;
            for (var i = 3; i >= 0; i--) {
                ta = arguments[i];
                t = (ta & 0xFF);
                ta = ta >>> 8;
                t = t << 8;
                t = t | (ta & 0xFF);
                ta = ta >>> 8;
                t = t << 8;
                t = t | (ta & 0xFF);
                ta = ta >>> 8;
                t = t << 8;
                t = t | ta;
                ra = ra + to_zerofilled_hex(t);
            }
            return ra;
        }
        var databytes = [];
        for (var i = 0; i < data.byteLength; i++) {
            databytes.push(data[i]);
        }
        // save original length
        var org_len = databytes.length;
        // first append the "1" + 7x "0"
        databytes.push(0x80);
        // determine required amount of padding
        var tail = databytes.length % 64;
        // no room for msg length?
        if (tail > 56) {
            // pad to next 512 bit block
            for (var i = 0; i < (64 - tail); i++) {
                databytes.push(0x0);
            }
            tail = databytes.length % 64;
        }
        for (i = 0; i < (56 - tail); i++) {
            databytes.push(0x0);
        }
        // message length in bits mod 512 should now be 448
        // append 64 bit, little-endian original msg length (in *bits*!)
        databytes = databytes.concat(int64_to_bytes(org_len * 8));
        // initialize 4x32 bit state
        var h0 = 0x67452301;
        var h1 = 0xEFCDAB89;
        var h2 = 0x98BADCFE;
        var h3 = 0x10325476;
        // temp buffers
        var a = 0, b = 0, c = 0, d = 0;
        function _add(n1, n2) {
            return 0x0FFFFFFFF & (n1 + n2);
        }
        // function update partial state for each run
        var updateRun = function (nf, sin32, dw32, b32) {
            var temp = d;
            d = c;
            c = b;
            //b = b + rol(a + (nf + (sin32 + dw32)), b32);
            b = _add(b, rol(_add(a, _add(nf, _add(sin32, dw32))), b32));
            a = temp;
        };
        // Digest message
        for (i = 0; i < databytes.length / 64; i++) {
            // initialize run
            a = h0;
            b = h1;
            c = h2;
            d = h3;
            var ptr = i * 64;
            // do 64 runs
            updateRun(fF(b, c, d), 0xd76aa478, bytes_to_int32(databytes, ptr), 7);
            updateRun(fF(b, c, d), 0xe8c7b756, bytes_to_int32(databytes, ptr + 4), 12);
            updateRun(fF(b, c, d), 0x242070db, bytes_to_int32(databytes, ptr + 8), 17);
            updateRun(fF(b, c, d), 0xc1bdceee, bytes_to_int32(databytes, ptr + 12), 22);
            updateRun(fF(b, c, d), 0xf57c0faf, bytes_to_int32(databytes, ptr + 16), 7);
            updateRun(fF(b, c, d), 0x4787c62a, bytes_to_int32(databytes, ptr + 20), 12);
            updateRun(fF(b, c, d), 0xa8304613, bytes_to_int32(databytes, ptr + 24), 17);
            updateRun(fF(b, c, d), 0xfd469501, bytes_to_int32(databytes, ptr + 28), 22);
            updateRun(fF(b, c, d), 0x698098d8, bytes_to_int32(databytes, ptr + 32), 7);
            updateRun(fF(b, c, d), 0x8b44f7af, bytes_to_int32(databytes, ptr + 36), 12);
            updateRun(fF(b, c, d), 0xffff5bb1, bytes_to_int32(databytes, ptr + 40), 17);
            updateRun(fF(b, c, d), 0x895cd7be, bytes_to_int32(databytes, ptr + 44), 22);
            updateRun(fF(b, c, d), 0x6b901122, bytes_to_int32(databytes, ptr + 48), 7);
            updateRun(fF(b, c, d), 0xfd987193, bytes_to_int32(databytes, ptr + 52), 12);
            updateRun(fF(b, c, d), 0xa679438e, bytes_to_int32(databytes, ptr + 56), 17);
            updateRun(fF(b, c, d), 0x49b40821, bytes_to_int32(databytes, ptr + 60), 22);
            updateRun(fG(b, c, d), 0xf61e2562, bytes_to_int32(databytes, ptr + 4), 5);
            updateRun(fG(b, c, d), 0xc040b340, bytes_to_int32(databytes, ptr + 24), 9);
            updateRun(fG(b, c, d), 0x265e5a51, bytes_to_int32(databytes, ptr + 44), 14);
            updateRun(fG(b, c, d), 0xe9b6c7aa, bytes_to_int32(databytes, ptr), 20);
            updateRun(fG(b, c, d), 0xd62f105d, bytes_to_int32(databytes, ptr + 20), 5);
            updateRun(fG(b, c, d), 0x2441453, bytes_to_int32(databytes, ptr + 40), 9);
            updateRun(fG(b, c, d), 0xd8a1e681, bytes_to_int32(databytes, ptr + 60), 14);
            updateRun(fG(b, c, d), 0xe7d3fbc8, bytes_to_int32(databytes, ptr + 16), 20);
            updateRun(fG(b, c, d), 0x21e1cde6, bytes_to_int32(databytes, ptr + 36), 5);
            updateRun(fG(b, c, d), 0xc33707d6, bytes_to_int32(databytes, ptr + 56), 9);
            updateRun(fG(b, c, d), 0xf4d50d87, bytes_to_int32(databytes, ptr + 12), 14);
            updateRun(fG(b, c, d), 0x455a14ed, bytes_to_int32(databytes, ptr + 32), 20);
            updateRun(fG(b, c, d), 0xa9e3e905, bytes_to_int32(databytes, ptr + 52), 5);
            updateRun(fG(b, c, d), 0xfcefa3f8, bytes_to_int32(databytes, ptr + 8), 9);
            updateRun(fG(b, c, d), 0x676f02d9, bytes_to_int32(databytes, ptr + 28), 14);
            updateRun(fG(b, c, d), 0x8d2a4c8a, bytes_to_int32(databytes, ptr + 48), 20);
            updateRun(fH(b, c, d), 0xfffa3942, bytes_to_int32(databytes, ptr + 20), 4);
            updateRun(fH(b, c, d), 0x8771f681, bytes_to_int32(databytes, ptr + 32), 11);
            updateRun(fH(b, c, d), 0x6d9d6122, bytes_to_int32(databytes, ptr + 44), 16);
            updateRun(fH(b, c, d), 0xfde5380c, bytes_to_int32(databytes, ptr + 56), 23);
            updateRun(fH(b, c, d), 0xa4beea44, bytes_to_int32(databytes, ptr + 4), 4);
            updateRun(fH(b, c, d), 0x4bdecfa9, bytes_to_int32(databytes, ptr + 16), 11);
            updateRun(fH(b, c, d), 0xf6bb4b60, bytes_to_int32(databytes, ptr + 28), 16);
            updateRun(fH(b, c, d), 0xbebfbc70, bytes_to_int32(databytes, ptr + 40), 23);
            updateRun(fH(b, c, d), 0x289b7ec6, bytes_to_int32(databytes, ptr + 52), 4);
            updateRun(fH(b, c, d), 0xeaa127fa, bytes_to_int32(databytes, ptr), 11);
            updateRun(fH(b, c, d), 0xd4ef3085, bytes_to_int32(databytes, ptr + 12), 16);
            updateRun(fH(b, c, d), 0x4881d05, bytes_to_int32(databytes, ptr + 24), 23);
            updateRun(fH(b, c, d), 0xd9d4d039, bytes_to_int32(databytes, ptr + 36), 4);
            updateRun(fH(b, c, d), 0xe6db99e5, bytes_to_int32(databytes, ptr + 48), 11);
            updateRun(fH(b, c, d), 0x1fa27cf8, bytes_to_int32(databytes, ptr + 60), 16);
            updateRun(fH(b, c, d), 0xc4ac5665, bytes_to_int32(databytes, ptr + 8), 23);
            updateRun(fI(b, c, d), 0xf4292244, bytes_to_int32(databytes, ptr), 6);
            updateRun(fI(b, c, d), 0x432aff97, bytes_to_int32(databytes, ptr + 28), 10);
            updateRun(fI(b, c, d), 0xab9423a7, bytes_to_int32(databytes, ptr + 56), 15);
            updateRun(fI(b, c, d), 0xfc93a039, bytes_to_int32(databytes, ptr + 20), 21);
            updateRun(fI(b, c, d), 0x655b59c3, bytes_to_int32(databytes, ptr + 48), 6);
            updateRun(fI(b, c, d), 0x8f0ccc92, bytes_to_int32(databytes, ptr + 12), 10);
            updateRun(fI(b, c, d), 0xffeff47d, bytes_to_int32(databytes, ptr + 40), 15);
            updateRun(fI(b, c, d), 0x85845dd1, bytes_to_int32(databytes, ptr + 4), 21);
            updateRun(fI(b, c, d), 0x6fa87e4f, bytes_to_int32(databytes, ptr + 32), 6);
            updateRun(fI(b, c, d), 0xfe2ce6e0, bytes_to_int32(databytes, ptr + 60), 10);
            updateRun(fI(b, c, d), 0xa3014314, bytes_to_int32(databytes, ptr + 24), 15);
            updateRun(fI(b, c, d), 0x4e0811a1, bytes_to_int32(databytes, ptr + 52), 21);
            updateRun(fI(b, c, d), 0xf7537e82, bytes_to_int32(databytes, ptr + 16), 6);
            updateRun(fI(b, c, d), 0xbd3af235, bytes_to_int32(databytes, ptr + 44), 10);
            updateRun(fI(b, c, d), 0x2ad7d2bb, bytes_to_int32(databytes, ptr + 8), 15);
            updateRun(fI(b, c, d), 0xeb86d391, bytes_to_int32(databytes, ptr + 36), 21);
            // update buffers
            h0 = _add(h0, a);
            h1 = _add(h1, b);
            h2 = _add(h2, c);
            h3 = _add(h3, d);
        }
        // Done! Convert buffers to 128 bit (LE)
        return int128le_to_hex(h3, h2, h1, h0).toLowerCase();
    }
    xgame.MD5 = MD5;
    ;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 普通加密
     */
    var NormalEncypt = /** @class */ (function () {
        function NormalEncypt() {
        }
        NormalEncypt.encrypt = function (content, password) {
            var newstr = "";
            var passwordLen = password.length;
            for (var i = 0; i < content.length; i += passwordLen) {
                for (var y = 0; y < passwordLen && i + y < content.length; y++) {
                    newstr += String.fromCharCode(content.charCodeAt(i + y) ^ password.charCodeAt(y));
                }
            }
            return newstr;
        };
        NormalEncypt.decrypt = function (content, password) {
            var newstr = "";
            var passwordLen = password.length;
            for (var i = 0; i < content.length; i += passwordLen) {
                for (var y = 0; y < passwordLen && i + y < content.length; y++) {
                    newstr += String.fromCharCode(content.charCodeAt(i + y) ^ password.charCodeAt(y));
                }
            }
            return newstr;
        };
        /**
         * 获得已加密字段
         * @param data 数据包
         * @param key 作用字段
         * @retrun value 值
         */
        NormalEncypt.getEncryptValue = function (data, key) {
            var srcValue = data[key];
            if (srcValue === null || srcValue === undefined) {
                return { value: srcValue, isErr: false };
            }
            var encryptValue = data["___" + key];
            var keys = ['b', 'o', 'x', 'h', 'e', 'r', 'o'].reverse();
            if (encryptValue === null || encryptValue === undefined) {
                encryptValue = data["___" + key] = this.encrypt(srcValue.toString(), keys.join(''));
            }
            var decryptValue = this.decrypt(encryptValue, keys.join(''));
            var isErr = srcValue.toString() != decryptValue;
            return { value: Number(decryptValue), isErr: isErr };
        };
        /**
         * 设置已加密字段
         * @param data 数据包
         * @param key 作用字段
         * @param value 值
         */
        NormalEncypt.setEncryptValue = function (data, key, value) {
            var keys = ['b', 'o', 'x', 'h', 'e', 'r', 'o'].reverse();
            var isErr = data[key] && data["___" + key] && (data[key].toString() != this.decrypt(data["___" + key], keys.join('')));
            if (!isErr) {
                data[key] = value;
            }
            data["___" + key] = this.encrypt(value.toString(), keys.join(''));
            return isErr;
        };
        return NormalEncypt;
    }());
    xgame.NormalEncypt = NormalEncypt;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var HashObject = /** @class */ (function () {
        function HashObject() {
            this._hashCode = null;
            this._hashCode = xgame.MathTools.getHashCode();
        }
        Object.defineProperty(HashObject.prototype, "hashCode", {
            get: function () {
                return this._hashCode;
            },
            enumerable: false,
            configurable: true
        });
        return HashObject;
    }());
    xgame.HashObject = HashObject;
})(xgame || (xgame = {}));
/**
 * 热更新包装cocos
 */
var xgame;
(function (xgame) {
    /**
     * 生成热更新
     */
    var HotUpdate = /** @class */ (function () {
        /**
         * 热更新模块
         * @param projectMainfestPath 本地默认资源版本文件路径
         * @param version 本地包版本
         * @param clearNativeData 本地宝版本不同是否清除缓存资源
         */
        function HotUpdate(projectMainfestPath) {
            /** 资源管理器 */
            //@ts-ignore
            this._jam = null;
            /** 本地存档路径 */
            this._storagePath = null;
            /** 是否更新中 */
            this._updating = false;
            if (projectMainfestPath == null && projectMainfestPath || projectMainfestPath == "") {
                console.error('本地清单文件地址错误 : ' + projectMainfestPath);
                return;
            }
            //先处理本地是否删除问题
            this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'xgameRemoteAsset');
            console.log("[HotUpdate new] \u672C\u5730\u70ED\u66F4\u65B0\u8DEF\u5F84:" + this._storagePath + " ");
            console.log('远程资源下载到本地路径 : ' + this._storagePath);
            console.log('本地清单文件地址 : ' + projectMainfestPath);
            // 获取本地mainfest文件路径
            var url = projectMainfestPath;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._jam = new jsb.AssetsManager(url, this._storagePath, this.compareVersion);
            this._jam.setVerifyCallback(this.verifyCallback);
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                // Some Android device may slow down the download process when concurrent tasks is too much.
                // The value may not be accurate, please do more test and find what's most suitable for your game.
                this._jam.setMaxConcurrentTask(2);
            }
        }
        /**
         * 在热更新前先检查版本
         * 检查大版本是否变化，变化后清除本地更新资源
         * @param version
         */
        HotUpdate.checkPackageVersion = function (version) {
            if (!cc.sys.isNative)
                return false;
            // 之前版本保存在 local Storage 中的版本号，如果没有认为是旧版本
            var nativeVersionKey = 'xgame_native_version';
            var previousVersion = cc.sys.localStorage.getItem(nativeVersionKey);
            var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'xgameRemoteAsset');
            // game.currentVersion 为该版本的常量
            if (previousVersion != version) {
                // 热更新的储存路径，如果旧版本中有多个，可能需要记录在列表中，全部清理
                jsb.fileUtils.removeDirectory(storagePath);
                console.log("[HotUpdate] \u5220\u9664\u672C\u5730\u76EE\u5F55:" + storagePath);
            }
            cc.sys.localStorage.setItem(nativeVersionKey, version);
            console.log("[HotUpdate] \u672C\u5730\u7248\u672C\u53D1\u751F\u53D8\u5316\uFF0C\u6E05\u9664\u672C\u5730\u4E0B\u8F7D\u7F13\u5B58\u6570\u636E:" + previousVersion + " " + version + " " + (previousVersion != version));
            return previousVersion != version;
        };
        /**
         * 检查是否需要热更新
         */
        HotUpdate.prototype.checkUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this._updating) {
                        console.log("[HotUpdate] \u5DF2\u7ECF\u5728\u66F4\u65B0\u4E2D ...");
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            //更新回调
                            var result = false;
                            var checkCb = function (event) {
                                console.log('[HotUpdate] 检查更新回调 Code: ' + event.getEventCode());
                                switch (event.getEventCode()) {
                                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                                        console.error("[HotUpdate] \u672A\u627E\u5230\u672C\u5730\u8D44\u6E90\u6E05\u5355\u6587\u4EF6...");
                                        break;
                                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                                        console.error("[HotUpdate] \u4E0B\u8F7D\u8FDC\u7A0B\u6E05\u5355\u6587\u4EF6\u5931\u8D25...");
                                        break;
                                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                                        console.warn("[HotUpdate] \u5DF2\u7ECF\u662F\u8FDC\u7A0B\u6700\u65B0\u6587\u4EF6\uFF0C\u65E0\u9700\u66F4\u65B0...");
                                        break;
                                    case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                                        console.log("[HotUpdate] \u53D1\u73B0\u65B0\u8D44\u6E90\uFF0C\u53EF\u4EE5\u66F4\u65B0!");
                                        result = true;
                                        break;
                                    default:
                                        return;
                                }
                                _this._jam.setEventCallback(null);
                                _this._updating = false;
                                resolve(result);
                            };
                            //未加载清单文件则开始加载清单文件
                            if (!_this._jam.getLocalManifest() || !_this._jam.getLocalManifest().isLoaded()) {
                                console.error("[HotUpdate] \u6E05\u5355\u6587\u4EF6\u52A0\u8F7D\u5931\u8D25 ...");
                                resolve(result);
                                return;
                            }
                            console.log("[HotUpdate] \u5F00\u59CB\u68C0\u67E5\u66F4\u65B0\u6587\u4EF6...");
                            _this._jam.setEventCallback(checkCb);
                            _this._jam.checkUpdate();
                            _this._updating = true;
                        })];
                });
            });
        };
        /**
         * 开始热更新
         * @param progressCall 更新进度回调
         * @return 更新结果
         */
        HotUpdate.prototype.startHotUpdate = function (progressCall) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this._updating) {
                        console.log("[HotUpdate] Checking or updating ...");
                        progressCall && progressCall(1);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (_this._jam && !_this._updating) {
                                var updateCb = function (event) {
                                    var needRestart = false;
                                    var failed = false;
                                    switch (event.getEventCode()) {
                                        case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                                            console.error("[HotUpdate] \u672A\u627E\u5230\u672C\u5730\u8D44\u6E90\u6E05\u5355\u6587\u4EF6...");
                                            failed = true;
                                            break;
                                        case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                                            console.log("[HotUpdate] \u8FDB\u5EA6:" + event.getPercent() + " \u6587\u4EF6:" + event.getPercentByFile());
                                            console.log("[HotUpdate] \u6570\u91CF\u8FDB\u5EA6:" + event.getDownloadedFiles() / event.getTotalFiles());
                                            console.log("[HotUpdate] \u5927\u5C0F\u8FDB\u5EA6:" + event.getDownloadedBytes() / event.getTotalBytes());
                                            progressCall && progressCall(isNaN(event.getPercent()) ? 0 : event.getPercent());
                                            var msg = event.getMessage();
                                            if (msg) {
                                                console.log("[HotUpdate] \u66F4\u65B0 :" + msg);
                                            }
                                            break;
                                        case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                                        case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                                            console.error("[HotUpdate] \u4E0B\u8F7D\u8FDC\u7A0B\u6E05\u5355\u6587\u4EF6\u5931\u8D25...");
                                            failed = true;
                                            break;
                                        case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                                            console.warn("[HotUpdate] \u5DF2\u7ECF\u662F\u8FDC\u7A0B\u6700\u65B0\u6587\u4EF6\uFF0C\u65E0\u9700\u66F4\u65B0...");
                                            failed = true;
                                            break;
                                        case jsb.EventAssetsManager.ERROR_UPDATING:
                                            console.warn("[HotUpdate] \u9519\u8BEF\u66F4\u65B0 AssetId:" + event.getAssetId() + " info:" + event.getMessage());
                                            break;
                                        case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                                            console.warn("[HotUpdate] \u89E3\u538B\u5931\u8D25 info:" + event.getMessage());
                                            break;
                                        case jsb.EventAssetsManager.UPDATE_FINISHED:
                                            console.warn("[HotUpdate] \u65E0\u9700\u66F4\u65B0\u5B8C\u6210 : " + event.getMessage());
                                            needRestart = true;
                                            break;
                                        case jsb.EventAssetsManager.UPDATE_FAILED:
                                            console.warn("[HotUpdate] \u66F4\u65B0\u5931\u8D25 : " + event.getMessage());
                                            failed = true;
                                            break;
                                        default:
                                            break;
                                    }
                                    if (failed) {
                                        _this._jam.setEventCallback(null);
                                        _this._updating = false;
                                        resolve(false);
                                    }
                                    if (needRestart) {
                                        _this._jam.setEventCallback(null);
                                        progressCall && progressCall(1);
                                        _this._updating = false;
                                        resolve(true);
                                    }
                                };
                                _this._jam.setEventCallback(updateCb);
                                _this._jam.update();
                                _this._updating = true;
                            }
                            return true;
                        })];
                });
            });
        };
        /**
         * 版本比较函数 - 提供给cocos框架
         * @param versionA
         * @param versionB
         */
        HotUpdate.prototype.compareVersion = function (versionA, versionB) {
            // Setup your own version compare handler, versionA and B is versions in string
            // if the return value greater than 0, versionA is greater than B,
            // if the return value equals 0, versionA equals to B,
            // if the return value smaller than 0, versionA is smaller than B.
            cc.log("[HotUpdate.compareVersion] \u7248\u672C\u6BD4\u8F83 \u7248\u672C A : " + versionA + " \u7248\u672C B : " + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || '0');
                isNaN(a) && (a = 0);
                isNaN(b) && (b = 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        };
        HotUpdate.prototype.verifyCallback = function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            try {
                //@ts-ignore
                var fileData = jsb.fileUtils.getDataFromFile(path);
                var fileMD5Value = xgame.MD5(fileData);
                // console.log("[HotUpdate.verifyCallback] : MD5 " + expectedMD5 + '->' + fileMD5Value + " url:" + path);
                if (fileMD5Value == expectedMD5)
                    console.log("[\u8D44\u6E90\u4E0B\u8F7D\u5931\u8D25MD5] \u6821\u9A8C\u6210\u529F " + path);
                else {
                    console.error("[\u8D44\u6E90\u4E0B\u8F7D\u5931\u8D25MD5] \u6821\u9A8C\u5931\u8D25 " + path);
                }
                return fileMD5Value == expectedMD5;
            }
            catch (e) {
                return false;
            }
        };
        HotUpdate.prototype.clearLocalRes = function (nativeVersion) {
            // 之前版本保存在 local Storage 中的版本号，如果没有认为是旧版本
            var nativeVersionKey = 'xgame_native_version';
            var previousVersion = cc.sys.localStorage.getItem(nativeVersionKey);
            // game.currentVersion 为该版本的常量
            if (previousVersion != nativeVersion) {
                // 热更新的储存路径，如果旧版本中有多个，可能需要记录在列表中，全部清理
                jsb.fileUtils.removeDirectory(this._storagePath);
                console.log("[HotUpdate] \u5220\u9664\u672C\u5730\u76EE\u5F55:" + this._storagePath);
            }
            cc.sys.localStorage.setItem(nativeVersionKey, nativeVersion);
            console.log("[HotUpdate] \u672C\u5730\u7248\u672C\u53D1\u751F\u53D8\u5316\uFF0C\u6E05\u9664\u672C\u5730\u4E0B\u8F7D\u7F13\u5B58\u6570\u636E:" + previousVersion + " " + nativeVersion);
            return previousVersion != nativeVersion;
        };
        HotUpdate.prototype.dispose = function () {
            console.warn("\u9500\u6BC1\u70ED\u66F4\u65B0\u5BF9\u8C61!");
            delete this._jam;
        };
        return HotUpdate;
    }());
    xgame.HotUpdate = HotUpdate;
})(xgame || (xgame = {}));
// mt.js 0.2.4 (2005-12-23)
/*

Mersenne Twister in JavaScript based on "mt19937ar.c"

 * JavaScript version by Magicant: Copyright (C) 2005 Magicant


 * Original C version by Makoto Matsumoto and Takuji Nishimura
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in the
     documentation and/or other materials provided with the distribution.

  3. The names of its contributors may not be used to endorse or promote
     products derived from this software without specific prior written
     permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
// Methods whose name starts with "_" are private methods.
// Don't call them externally!
var xgame;
(function (xgame) {
    var MersenneTwister = /** @class */ (function () {
        /**
         * Constructor: MersenneTwister([integer/Array<integer> seed])
         * initializes the object with the given seed.
         * The seed may be an integer or an array of integers.
         * If the seed is not given, the object will be initialized with the current
         * time: new Date().getTime().
         * See also: setSeed(seed).
         */
        function MersenneTwister(seed) {
            if (seed === undefined)
                seed = new Date().getTime();
            this._mt = new Array(624);
            this.setSeed(seed);
        }
        /** multiplies two uint32 values and returns a uint32 result. */
        MersenneTwister._mulUint32 = function (a, b) {
            var a1 = a >>> 16, a2 = a & 0xffff;
            var b1 = b >>> 16, b2 = b & 0xffff;
            return (((a1 * b2 + a2 * b1) << 16) + a2 * b2) >>> 0;
        };
        ;
        /** returns ceil(value) if value is finite number, otherwise 0. */
        MersenneTwister._toNumber = function (x) {
            return (typeof x == "number" && !isNaN(x)) ? Math.ceil(x) : 0;
        };
        ;
        /**
         * Method: setSeed(integer/Array<integer> seed)
         * resets the seed. The seed may be an integer or an array of integers.
         * Elements in the seed array that are not numbers will be treated as 0.
         * Numbers that are not integers will be rounded down.
         * The integer(s) should be greater than or equal to 0 and less than 2^32.
         * This method is compatible with init_genrand and init_by_array function of
         * the original C version.
         */
        MersenneTwister.prototype.setSeed = function (seed) {
            var mt = this._mt;
            if (typeof seed == "number") {
                mt[0] = seed >>> 0;
                for (var i = 1; i < mt.length; i++) {
                    var x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                    mt[i] = MersenneTwister._mulUint32(1812433253, x) + i;
                }
                this._index = mt.length;
            }
            else if (seed instanceof Array) {
                var i = 1, j = 0;
                this.setSeed(19650218);
                for (var k = Math.max(mt.length, seed.length); k > 0; k--) {
                    var x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                    x = MersenneTwister._mulUint32(x, 1664525);
                    mt[i] = (mt[i] ^ x) + (seed[j] >>> 0) + j;
                    if (++i >= mt.length) {
                        mt[0] = mt[mt.length - 1];
                        i = 1;
                    }
                    if (++j >= seed.length) {
                        j = 0;
                    }
                }
                for (var k = mt.length - 1; k > 0; k--) {
                    var x = mt[i - 1] ^ (mt[i - 1] >>> 30);
                    x = MersenneTwister._mulUint32(x, 1566083941);
                    mt[i] = (mt[i] ^ x) - i;
                    if (++i >= mt.length) {
                        mt[0] = mt[mt.length - 1];
                        i = 1;
                    }
                }
                mt[0] = 0x80000000;
            }
            else {
                throw new TypeError("MersenneTwister: illegal seed.");
            }
        };
        ;
        /** returns the next random Uint32 value. */
        MersenneTwister.prototype._nextInt = function () {
            var mt = this._mt, value;
            if (this._index >= mt.length) {
                var k = 0, N = mt.length, M = 397;
                do {
                    value = (mt[k] & 0x80000000) | (mt[k + 1] & 0x7fffffff);
                    mt[k] = mt[k + M] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                } while (++k < N - M);
                do {
                    value = (mt[k] & 0x80000000) | (mt[k + 1] & 0x7fffffff);
                    mt[k] = mt[k + M - N] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                } while (++k < N - 1);
                value = (mt[N - 1] & 0x80000000) | (mt[0] & 0x7fffffff);
                mt[N - 1] = mt[M - 1] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
                this._index = 0;
            }
            value = mt[this._index++];
            value ^= value >>> 11;
            value ^= (value << 7) & 0x9d2c5680;
            value ^= (value << 15) & 0xefc60000;
            value ^= value >>> 18;
            return value >>> 0;
        };
        ;
        /**
         * Method: nextInt([[number min,] number max])
         * returns a random integer that is greater than or equal to min and less than
         * max. The value of (max - min) must be positive number less or equal to 2^32.
         * If min is not given or not a number, this method uses 0 for min.
         * If neither of min and max is given or max is out of range, this method
         * uses 2^32 for max.
         * This method is compatible with genrand_int32 function of the original C
         * version for min=0 & max=2^32, but not with genrand_int31 function.
         */
        MersenneTwister.prototype.nextInt = function () {
            var min, sup;
            switch (arguments.length) {
                case 0:
                    return this._nextInt();
                case 1:
                    min = 0;
                    sup = MersenneTwister._toNumber(arguments[0]);
                    break;
                default:
                    min = MersenneTwister._toNumber(arguments[0]);
                    sup = MersenneTwister._toNumber(arguments[1]) - min;
                    break;
            }
            if (!(0 < sup && sup < 0x100000000))
                return this._nextInt() + min;
            if ((sup & (~sup + 1)) == sup)
                return ((sup - 1) & this._nextInt()) + min;
            var value;
            do {
                value = this._nextInt();
            } while (sup > 4294967296 - (value - (value %= sup)));
            return value + min;
        };
        ;
        /**
         * Method: next()
         * returns a random number that is greater than or equal to 0 and less than 1.
         * This method is compatible with genrand_res53 function of the original C
         * version.
         */
        MersenneTwister.prototype.next = function () {
            var a = this._nextInt() >>> 5, b = this._nextInt() >>> 6;
            return (a * 0x4000000 + b) / 0x20000000000000;
        };
        ;
        return MersenneTwister;
    }());
    xgame.MersenneTwister = MersenneTwister;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 处理注册相关内容
     * 1.做注册函数和对象的集中管理，统一注册以及统一释放注册
     */
    var RegisterHelper = /** @class */ (function () {
        function RegisterHelper() {
            this._datas = {};
        }
        /**
         * 添加监听的数据并且监听
         */
        RegisterHelper.prototype.on = function (data) {
            if (!data || !data.target || !data.func || !data.key || data.key == "") {
                cc.error("[RegisterHelper.addRegisterData] - \u6DFB\u52A0\u7684\u6CE8\u518C\u6570\u636E\u9519\u8BEF\uFF01");
                return this;
            }
            data.expFunc = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (RegisterHelper.onCanContinueEvent) {
                    RegisterHelper.onCanContinueEvent(data.key, args) && data.func.apply(data.funcTarget, args);
                }
                else {
                    data.func.apply(data.funcTarget, args);
                }
                // if (data.key == cc.Node.EventType.TOUCH_END && data.target instanceof cc.Node && data.target.name.indexOf('Btn') != -1) {
                // }
            };
            if (this._datas.hasOwnProperty(data.key)) {
                var tmpArr = this._datas[data.key];
                for (var _i = 0, tmpArr_1 = tmpArr; _i < tmpArr_1.length; _i++) {
                    var tmpData = tmpArr_1[_i];
                    //重复加载函数
                    if (xgame.compare(tmpData, data, { expFunc: true }))
                        return this;
                }
                // if(xgame.getXGame().audioMgr.re)
                tmpArr.push(data);
                data.target.on(data.key, data.expFunc, data.funcTarget);
            }
            else {
                this._datas[data.key] = [];
                var tmpDataArr = this._datas[data.key];
                tmpDataArr.push(data);
                data.target.on(data.key, data.expFunc, data.funcTarget);
            }
            return this;
        };
        /**
         * 删除所有的时间监听
         */
        RegisterHelper.prototype.offAll = function () {
            for (var key in this._datas) {
                var tmpDataArr = this._datas[key];
                if (tmpDataArr) {
                    for (var _i = 0, tmpDataArr_1 = tmpDataArr; _i < tmpDataArr_1.length; _i++) {
                        var tmpData = tmpDataArr_1[_i];
                        if (tmpData)
                            tmpData.target.off(tmpData.key, tmpData.expFunc, tmpData.funcTarget);
                    }
                    delete this._datas[key];
                }
            }
        };
        RegisterHelper.prototype.dispose = function () {
            this.offAll();
            delete this._datas;
        };
        /**
         * 删除指定的时间监听
         */
        RegisterHelper.prototype.off = function (data) {
            if (!this._datas || !this._datas.hasOwnProperty(data.key))
                return;
            var tmpDataArr = this._datas[data.key];
            var index = 0;
            for (index; index < tmpDataArr.length; index++) {
                var tmpData = tmpDataArr[index];
                if (xgame.compare(tmpData, data, { expFunc: 0 })) {
                    tmpData.target.off(tmpData.key, tmpData.expFunc, tmpData.funcTarget);
                    delete tmpDataArr[index];
                    break;
                }
            }
        };
        return RegisterHelper;
    }());
    xgame.RegisterHelper = RegisterHelper;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 简单状态机实现
     * @param {T} 状态枚举类型
     * @param {K} 使用状态机的类型
     */
    var AsyncStateHelper = /** @class */ (function () {
        function AsyncStateHelper(target, defaultState) {
            if (defaultState === void 0) { defaultState = null; }
            /** 状态切换中 */
            this.isBusy = false;
            /** 预订的下个状态 */
            this._nextState = null;
            this._curStateID = defaultState;
            this._states = {};
            this._target = target;
            this.isBusy = false;
        }
        Object.defineProperty(AsyncStateHelper.prototype, "curState", {
            get: function () {
                return this._curStateID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsyncStateHelper.prototype, "lastState", {
            get: function () {
                return this._lastStateID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsyncStateHelper.prototype, "target", {
            get: function () { return this._target; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(AsyncStateHelper.prototype, "nextState", {
            get: function () {
                return this._nextState;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 添加一个状态对象给状态机持有
         */
        AsyncStateHelper.prototype.addStateObject = function (stateObj) {
            if (stateObj == null || stateObj.stateID == null || this._states.hasOwnProperty(stateObj.stateID.toString())) {
                console.error("[AsyncStateHelper.addStateObject] - has sateID : " + stateObj.stateID);
                return;
            }
            this._states[stateObj.stateID.toString()] = stateObj;
        };
        /**
         * 添加一个状态对象给状态机持有
         */
        AsyncStateHelper.prototype.replaceStateObject = function (stateObj) {
            if (stateObj != null && this._states.hasOwnProperty(stateObj.stateID.toString())) {
                console.error("[AsyncStateHelper.addStateObject] - dot have sateID : " + stateObj.stateID);
                return;
            }
            this._states[stateObj.stateID.toString()] = stateObj;
        };
        /**
         * 移除一个状态
         * @param  {IAsyncStateObject<T} state
         * @param  {any} K>
         */
        AsyncStateHelper.prototype.removeStateObject = function (stateID) {
            if (stateID == null || !this._states.hasOwnProperty(stateID.toString())) {
                console.error("[AsyncStateHelper.addStateObject] - not have sateID : " + stateID);
                return;
            }
            delete this._states[stateID.toString()];
        };
        AsyncStateHelper.prototype.getCurStateObj = function () {
            return this.getStateObj(this._curStateID);
        };
        AsyncStateHelper.prototype.getStateObj = function (stateID) {
            if (stateID != null && this._states && this._states.hasOwnProperty(stateID.toString()))
                return this._states[stateID.toString()];
            return null;
        };
        /**
         * 设置状态
         * @param state 新的状态
         */
        AsyncStateHelper.prototype.setState = function (stateID) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (stateID == null)
                                return [2 /*return*/];
                            if (!(this._curStateID != stateID)) return [3 /*break*/, 3];
                            if (!this.isBusy) return [3 /*break*/, 1];
                            this._nextState = stateID;
                            return [3 /*break*/, 3];
                        case 1:
                            this.isBusy = true;
                            this._lastStateID = this._curStateID;
                            this._curStateID = stateID;
                            return [4 /*yield*/, this.dispatchStateChangeEvent(stateID)];
                        case 2:
                            _a.sent();
                            this.isBusy = false;
                            this.updateNextState();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 强制进入指定状态
         * @param stateID 状态ID
         */
        AsyncStateHelper.prototype.forceSetState = function (stateID) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(stateID == this._curStateID)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.resetCurState(this._target)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.setState(stateID)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新下个状态
         */
        AsyncStateHelper.prototype.updateNextState = function () {
            if (this.nextState) {
                this.setState(this.nextState);
                this._nextState = null;
            }
        };
        /**
         * 重置状态
         * @param state 新的状态
         */
        AsyncStateHelper.prototype.resetCurState = function (target) {
            return __awaiter(this, void 0, void 0, function () {
                var curStateObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            curStateObj = this.getCurStateObj();
                            if (!curStateObj) return [3 /*break*/, 3];
                            return [4 /*yield*/, curStateObj.onExit(curStateObj, target)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, curStateObj.onEnter(curStateObj, target)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AsyncStateHelper.prototype.backSate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.setState(this._lastStateID)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新状态
         * @param {number} dt 上次调用此接口到本地的时间
         */
        AsyncStateHelper.prototype.updateCurState = function (dt) {
            var tmpCurState = this.getCurStateObj();
            if (tmpCurState != null) {
                tmpCurState.onUpdate(dt, this._target);
            }
        };
        /**
         * 遍历所有状态
         * @param call
         */
        AsyncStateHelper.prototype.foreachState = function (call) {
            for (var key in this._states) {
                if (this._states.hasOwnProperty(key)) {
                    call(this._states[key]);
                }
            }
        };
        /**
         * 添加状态变化的监听回调
         * @param 被执行的函数
         * @param 执行函数目标对象
         */
        AsyncStateHelper.prototype.setStateChangeEventListener = function (listener, target) {
            this._listerTarget = target;
            this._eventLister = listener;
        };
        AsyncStateHelper.prototype.destory = function () {
            if (this.getCurStateObj()) {
                this.getCurStateObj().onExit(null, this._target);
            }
            for (var key in this._states) {
                if (this._states.hasOwnProperty(key)) {
                    delete this._states[key];
                }
            }
            delete this._listerTarget;
            delete this._target;
            delete this._eventLister;
            delete this._states;
        };
        /**
         * 处理状态变化
         * @param newState 新状态
         */
        AsyncStateHelper.prototype.dispatchStateChangeEvent = function (newState) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._eventLister && this._listerTarget) {
                                this._eventLister.call(this._listerTarget, this._curStateID, this._lastStateID);
                            }
                            return [4 /*yield*/, this.updateStateObj(this._lastStateID, this._curStateID)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AsyncStateHelper.prototype.updateStateObj = function (lastSatateID, newStateID) {
            return __awaiter(this, void 0, void 0, function () {
                var tmpCurStateObj, tmpNextStateObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tmpCurStateObj = this.getStateObj(lastSatateID);
                            tmpNextStateObj = this.getStateObj(newStateID);
                            if (!(tmpCurStateObj != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, tmpCurStateObj.onExit(tmpNextStateObj, this._target)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(tmpNextStateObj != null)) return [3 /*break*/, 4];
                            return [4 /*yield*/, tmpNextStateObj.onEnter(tmpCurStateObj, this._target)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return AsyncStateHelper;
    }());
    xgame.AsyncStateHelper = AsyncStateHelper;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 状态机的状态对象接口
     * 1.单独处理每个状态下对象的逻辑
     * @param {T} 持有状态机的类型
     */
    var IAsyncStateObject = /** @class */ (function () {
        function IAsyncStateObject(stateID) {
            this.stateID = stateID;
        }
        return IAsyncStateObject;
    }());
    xgame.IAsyncStateObject = IAsyncStateObject;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 属性行为定义
     */
    var EnumAttributesAction;
    (function (EnumAttributesAction) {
        //加
        EnumAttributesAction[EnumAttributesAction["add"] = 0] = "add";
        //乘
        EnumAttributesAction[EnumAttributesAction["mul"] = 1] = "mul";
        //修改最大值
        EnumAttributesAction[EnumAttributesAction["max"] = 2] = "max";
    })(EnumAttributesAction = xgame.EnumAttributesAction || (xgame.EnumAttributesAction = {}));
    /**
     * 构建一个属性值
     * @param baseValue 初始值
     */
    function createAttributes(baseValue, maxValue, minValue) {
        return {
            _baseValue: baseValue,
            value: baseValue,
            _value: baseValue,
            _maxValue: maxValue,
            _minValue: minValue,
            _actionDict: {}
        };
    }
    xgame.createAttributes = createAttributes;
    /**
     * 重置属性值到默认
     * @param att 属性对象
     */
    function resetAttributes(att) {
        att.value = att._baseValue;
        att._actionDict = {};
    }
    xgame.resetAttributes = resetAttributes;
    /**
     * 刷新属性最终值
     * @param att 属性对象
     */
    function updateAttributes(att) {
        var targetAdd = att._baseValue;
        var targetMul = 1;
        var targetMax = att._maxValue;
        var targetMin = att._minValue;
        for (var key in att._actionDict) {
            var action = att._actionDict[key];
            if (action.actionType == EnumAttributesAction.add) {
                targetAdd += action.value;
            }
            else if (action.actionType == EnumAttributesAction.mul) {
                targetMul = targetMul * action.value;
            }
            else if (action.actionType == EnumAttributesAction.max) {
                targetMax += action.value;
            }
        }
        att._value = targetAdd * targetMul;
        att.value = att._value;
        if (targetMax !== null && targetMax !== undefined && att.value > targetMax) {
            att.value = targetMax;
        }
        if (targetMin !== null && targetMin !== undefined && att.value < targetMin) {
            att.value = targetMin;
        }
    }
    /**
     * 添加一个变化到指定属性
     * @param att 属性对象
     * @param value 变化的值
     * @param actionType 变化类型
     * @param serialID 唯一标识（默认自动生成）
     * @returns serialID 返回一个唯一标识
     */
    function addAttributes(att, value, actionType, serialID) {
        if (serialID === void 0) { serialID = xgame.MathTools.getHashCode(); }
        var action = { value: value, actionType: actionType, serialID: serialID };
        att._actionDict[action.serialID] = action;
        updateAttributes(att);
        return action.serialID;
    }
    xgame.addAttributes = addAttributes;
    /**
     * 根据唯一标识删除属性变化
     * @param att 属性对象
     * @param serialID 唯一标识
     * @returns boolean 是否删除成功
     */
    function removeAttributes(att, serialID) {
        if (att._actionDict.hasOwnProperty(serialID)) {
            delete att._actionDict[serialID];
            updateAttributes(att);
            return true;
        }
        return false;
    }
    xgame.removeAttributes = removeAttributes;
    /**
     * 设置属性的初始值
     * @param att 属性对象
     * @param baseValue 初始值
     */
    function setAttributes(att, baseValue, maxValue, minValue) {
        maxValue === undefined && (maxValue = att._maxValue);
        minValue === undefined && (minValue = att._minValue);
        att._baseValue = baseValue;
        att._maxValue = maxValue;
        att._minValue = minValue;
        updateAttributes(att);
    }
    xgame.setAttributes = setAttributes;
})(xgame || (xgame = {}));
///<reference path="./IMultipleStateObject.ts" />
var xgame;
(function (xgame) {
    /**
     * 多状态状态机 状态之间不会有互斥现象
     * @param {T} 状态枚举类型
     * @param {K} 使用状态机的类型
     */
    var MultipleStateHelper = /** @class */ (function () {
        function MultipleStateHelper(target) {
            //持有状态对象
            this._states = [];
            this._stateObjects = {};
            this._target = target;
        }
        Object.defineProperty(MultipleStateHelper.prototype, "target", {
            get: function () { return this._target; },
            enumerable: false,
            configurable: true
        });
        ;
        MultipleStateHelper.prototype.activeState = function (state) {
            if (this._states[state])
                return false;
            var result = true;
            if (this._stateObjects[state])
                result = this._stateObjects[state].onEnter(this._target);
            this._states[state] = result;
            if (result)
                this.updateState(state, true);
            return result;
        };
        MultipleStateHelper.prototype.isActiveState = function (state) {
            return this._states[state] ? true : false;
        };
        MultipleStateHelper.prototype.cancelState = function (state) {
            if (!this._states[state])
                return false;
            var result = true;
            if (this._stateObjects[state])
                result = this._stateObjects[state].onExit(this._target);
            if (result)
                this.updateState(state, false);
            this._states[state] = !result;
            return result;
        };
        /**
         * 取消其他状态只保留指定状态
         * @param state 保留状态ID
         */
        MultipleStateHelper.prototype.cancelAllState = function () {
            for (var tmpState in this._stateObjects) {
                this.cancelState(parseInt(tmpState));
            }
        };
        MultipleStateHelper.prototype.refreshState = function (state) {
            var result = true;
            if (this._states[state])
                result = this.cancelState(state);
            if (result)
                result = this.activeState(state);
            return result;
        };
        /**
         * 刷新所有状态
         */
        MultipleStateHelper.prototype.refreshAllState = function () {
            for (var stateID = 0; stateID < this._states.length; stateID++) {
                this._states[stateID] && this.refreshState(stateID);
            }
        };
        /**
         * 回调状态变化
         * @param state 当前变化状态
         * @param result 状态变化结果
         */
        MultipleStateHelper.prototype.updateStateObject = function (dt) {
            for (var index = 0; index < this._states.length; index++) {
                if (this._states[index]) {
                    if (this._stateObjects.hasOwnProperty(index))
                        this._stateObjects[index].onUpdate(dt, this._target);
                }
            }
        };
        /**
         * 回调状态变化
         * @param state 当前变化状态
         * @param result 状态变化结果
         */
        MultipleStateHelper.prototype.updateState = function (state, result) {
            if (this._listerTarget && this._eventLister) {
                this._eventLister.call(this._listerTarget, state, result);
            }
        };
        /**
         * 添加状态变化的监听回调
         * @param 被执行的函数
         * @param 执行函数目标对象
         */
        MultipleStateHelper.prototype.setStateChangeEventListener = function (listener, target) {
            this._listerTarget = target;
            this._eventLister = listener;
        };
        /**
         * 添加一个状态对象给状态机持有
         */
        MultipleStateHelper.prototype.addStateObject = function (stateObj) {
            if (stateObj == null || stateObj.stateID == null || this._stateObjects.hasOwnProperty(stateObj.stateID.toString())) {
                console.error("[MultipleStateHelper.addStateObject] - has sateID : " + stateObj.stateID);
                return;
            }
            this._stateObjects[stateObj.stateID.toString()] = stateObj;
        };
        /**
         * 移除一个状态
         * @param  {IMultipleStateObject<T>} state
         * @param  {any} K>
         */
        MultipleStateHelper.prototype.removeStateObject = function (stateID) {
            if (stateID == null || !this._stateObjects.hasOwnProperty(stateID.toString())) {
                console.error("[MultipleStateHelper.removeStateObject] - not have sateID : " + stateID);
                return;
            }
            delete this._stateObjects[stateID.toString()];
        };
        MultipleStateHelper.prototype.destory = function () {
            for (var key in this._stateObjects) {
                if (this._stateObjects.hasOwnProperty(key)) {
                    delete this._stateObjects[key];
                }
            }
            delete this._target;
            delete this._listerTarget;
            delete this._eventLister;
            delete this._stateObjects;
        };
        return MultipleStateHelper;
    }());
    xgame.MultipleStateHelper = MultipleStateHelper;
})(xgame || (xgame = {}));
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var xgame;
(function (xgame) {
    var RefCountStateHelper = /** @class */ (function (_super) {
        __extends(RefCountStateHelper, _super);
        function RefCountStateHelper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //持有状态对象
            _this._statsDict = {};
            return _this;
        }
        RefCountStateHelper.prototype.activeState = function (state) {
            _super.prototype.activeState.call(this, state);
            var hascode = xgame.MathTools.getHashCode();
            this._statsDict[state] = this._statsDict[state] || {};
            this._statsDict[state][hascode] = true;
            return hascode;
        };
        RefCountStateHelper.prototype.cancelState = function (state, serialID) {
            var _a;
            if ((_a = this._statsDict[state]) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(serialID)) {
                delete this._statsDict[state][serialID];
                //console.log("onStartExecute---cancelState ");
                if (Object.keys(this._statsDict[state]).length == 0) {
                    delete this._statsDict[state];
                    //console.log("onStartExecute---cancelState true");
                    return _super.prototype.cancelState.call(this, state);
                }
            }
            return false;
        };
        return RefCountStateHelper;
    }(xgame.MultipleStateHelper));
    xgame.RefCountStateHelper = RefCountStateHelper;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 状态机的状态对象接口
     * 1.单独处理每个状态下对象的逻辑
     * @param {T} 持有状态机的类型
     */
    var IStateObject = /** @class */ (function () {
        function IStateObject(stateID) {
            this.stateID = stateID;
        }
        return IStateObject;
    }());
    xgame.IStateObject = IStateObject;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 简单状态机实现
     * @param {T} 状态枚举类型
     * @param {K} 使用状态机的类型
     */
    var StateHelper = /** @class */ (function () {
        function StateHelper(target, defaultState) {
            this._curStateID = defaultState;
            this._states = {};
            this._target = target;
        }
        Object.defineProperty(StateHelper.prototype, "curState", {
            get: function () {
                return this._curStateID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StateHelper.prototype, "lastState", {
            get: function () {
                return this._lastStateID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StateHelper.prototype, "target", {
            get: function () { return this._target; },
            enumerable: false,
            configurable: true
        });
        ;
        /**
         * 添加一个状态对象给状态机持有
         */
        StateHelper.prototype.addStateObject = function (stateObj) {
            if (stateObj == null || stateObj.stateID == null || this._states.hasOwnProperty(stateObj.stateID.toString())) {
                console.error("[StateHelper.addStateObject] - has sateID : " + stateObj.stateID);
                return;
            }
            this._states[stateObj.stateID.toString()] = stateObj;
        };
        /**
         * 添加一个状态对象给状态机持有
         */
        StateHelper.prototype.replaceStateObject = function (stateObj) {
            if (stateObj != null && this._states.hasOwnProperty(stateObj.stateID.toString())) {
                console.error("[StateHelper.replaceStateObject] - dot have sateID : " + stateObj.stateID);
                return;
            }
            this._states[stateObj.stateID.toString()] = stateObj;
        };
        /**
         * 移除一个状态
         * @param  {IStateObject<T} state
         * @param  {any} K>
         */
        StateHelper.prototype.removeStateObject = function (stateID) {
            if (stateID == null || !this._states.hasOwnProperty(stateID.toString())) {
                console.error("[StateHelper.removeStateObject] - not have sateID : " + stateID);
                return;
            }
            delete this._states[stateID.toString()];
        };
        StateHelper.prototype.getCurStateObj = function () {
            return this.getStateObj(this._curStateID);
        };
        StateHelper.prototype.getStateObj = function (stateID) {
            if (stateID != null && this._states && this._states.hasOwnProperty(stateID.toString()))
                return this._states[stateID.toString()];
            return null;
        };
        /**
         * 设置状态
         * @param state 新的状态
         */
        StateHelper.prototype.setState = function (stateID) {
            if (stateID == null)
                return;
            if (this._curStateID != stateID) {
                this.dispatchStateChangeEvent(stateID);
                this._lastStateID = this._curStateID;
                this._curStateID = stateID;
            }
        };
        /**
         * 强制进入状态
         * @param stateID 状态ID
         */
        StateHelper.prototype.forceSetState = function (stateID) {
            if (stateID == this._curStateID) {
                this.resetCurState(this._target);
            }
            else {
                this.setState(stateID);
            }
        };
        /**
         * 重置状态
         * @param state 新的状态
         */
        StateHelper.prototype.resetCurState = function (target) {
            var curStateObj = this.getCurStateObj();
            if (curStateObj) {
                curStateObj.onExit(curStateObj, target);
                curStateObj.onEnter(curStateObj, target);
            }
        };
        StateHelper.prototype.backSate = function () {
            this.setState(this._lastStateID);
        };
        /**
         * 更新状态
         * @param {number} dt 上次调用此接口到本地的时间
         */
        StateHelper.prototype.updateCurState = function (dt) {
            var tmpCurState = this.getCurStateObj();
            if (tmpCurState != null) {
                tmpCurState.onUpdate(dt, this._target);
            }
        };
        /**
         * 添加状态变化的监听回调
         * @param 被执行的函数
         * @param 执行函数目标对象
         */
        StateHelper.prototype.setStateChangeEventListener = function (listener, target) {
            this._listerTarget = target;
            this._eventLister = listener;
        };
        StateHelper.prototype.destory = function () {
            if (this.getCurStateObj()) {
                this.getCurStateObj().onExit(null, this._target);
            }
            for (var key in this._states) {
                if (this._states.hasOwnProperty(key)) {
                    delete this._states[key];
                }
            }
            delete this._listerTarget;
            delete this._target;
            delete this._eventLister;
            delete this._states;
        };
        /**
         * 处理状态变化
         * @param newState 新状态
         */
        StateHelper.prototype.dispatchStateChangeEvent = function (newState) {
            if (this._eventLister && this._listerTarget) {
                this._eventLister.call(this._listerTarget, this._curStateID, this._lastStateID);
            }
            this.updateStateObj(this._lastStateID, this._curStateID);
        };
        StateHelper.prototype.updateStateObj = function (lastSatateID, newStateID) {
            var tmpCurStateObj = this.getStateObj(lastSatateID);
            var tmpNextStateObj = this.getStateObj(newStateID);
            if (tmpCurStateObj != null) {
                tmpCurStateObj.onExit(tmpNextStateObj, this._target);
            }
            if (tmpNextStateObj != null) {
                tmpNextStateObj.onEnter(tmpCurStateObj, this._target);
            }
        };
        return StateHelper;
    }());
    xgame.StateHelper = StateHelper;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var ListNode = /** @class */ (function () {
        function ListNode(data) {
            /**下个节点 */
            this.nextNode = null;
            /**上个节点 */
            this.lastNode = null;
            /**数据 */
            this.data = null;
            this.data = data;
        }
        /**销毁数据 */
        ListNode.prototype.dispose = function () {
            delete this.nextNode;
            delete this.lastNode;
            this.data.doDestroy();
            delete this.data;
        };
        return ListNode;
    }());
    xgame.ListNode = ListNode;
    var List = /** @class */ (function () {
        function List() {
            /**起始节点 */
            this._beginNode = null;
            /**末尾节点 */
            this._endNode = null;
            /**数量 */
            this.count = 0;
        }
        /**
         * 添加一个数据到链表开始
         * @param data 数据
         */
        List.prototype.pushHead = function (data) {
            var result = new ListNode(data);
            if (this._beginNode != null) {
                this._beginNode.lastNode = result;
                result.nextNode = this._beginNode.nextNode;
            }
            if (this._endNode == null)
                this._endNode = result;
            this._beginNode = result;
            this.count++;
            return result;
        };
        /**
         * 数据添加到末尾
         * @param data 数据
         */
        List.prototype.pushEnd = function (data) {
            var result = new ListNode(data);
            if (this._beginNode == null)
                this._beginNode = result;
            if (this._endNode != null) {
                result.lastNode = this._endNode;
                this._endNode.nextNode = result;
            }
            this._endNode = result;
            this.count++;
            return result;
        };
        List.prototype.remove = function (data) {
            if (!data)
                return;
            var left = data.lastNode;
            var right = data.nextNode;
            if (left)
                left.nextNode = right;
            else
                this._beginNode = right;
            if (right)
                right.lastNode = left;
            else
                this._endNode = left;
            data.dispose();
            this.count--;
        };
        /**
         * 从前开始计算索引，指定索引获取节点对象
         * @param index 索引值
         */
        List.prototype.getIndex = function (index) {
            var result = this._beginNode;
            var tmpIndex = index;
            while (tmpIndex > 0 && result) {
                result = result.nextNode;
                tmpIndex--;
            }
            return result;
        };
        /**
         * 从后开始计算索引，指定索引获取节点对象
         * @param index 索引值
         */
        List.prototype.getLastIndex = function (index) {
            var result = this._endNode;
            var tmpIndex = index;
            while (tmpIndex > 0 && result) {
                result = result.lastNode;
                tmpIndex--;
            }
            return result;
        };
        List.prototype.front = function () {
            return this._beginNode;
        };
        List.prototype.end = function () {
            return this._endNode;
        };
        /**
     * 遍历链表
     * @param func 遍历链表回调函数 node 为遍历到的当前位置上的节点
     */
        List.prototype.forEach = function (func) {
            var _curNode = this._beginNode;
            while (_curNode) {
                if (!func(_curNode))
                    return;
                _curNode = _curNode.nextNode;
            }
        };
        List.prototype.dispose = function () {
            while (this._beginNode != null && this._endNode != null) {
                this.remove(this._beginNode);
            }
        };
        return List;
    }());
    xgame.List = List;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 渲染类型
     */
    var EnumRanderType;
    (function (EnumRanderType) {
        EnumRanderType[EnumRanderType["None"] = 0] = "None";
        //场景渲染
        EnumRanderType[EnumRanderType["Scene"] = 1] = "Scene";
        //显示UI渲染
        EnumRanderType[EnumRanderType["UI"] = 2] = "UI";
    })(EnumRanderType = xgame.EnumRanderType || (xgame.EnumRanderType = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * 游戏音乐控制器
         */
        var AudioMgr = /** @class */ (function () {
            function AudioMgr() {
                /**记录缓存当前播放的音乐KEY，保证在一定阀值内不会重复播放同一音效而导致性能下降或崩溃 */
                this._cacheAudioKey = {};
                /** 缓存播放对象 */
                this._wxAudioCache = [];
                /** 缓存正在播放的音乐对象 */
                this._wxPlayingCache = {};
                /** 等待恢复对象 */
                this._waitPlayInfo = {};
                /**暂停记录KEY */
                this._pauseCodeDict = {};
                /**
                 * 后台暂停KEY
                 */
                this._backgroundPauseKey = null;
                //背景音乐key
                this.strMusicKey = null;
                // 音乐音量
                this._musicOpen = true;
                // 音效音量
                this._musicEffecOpen = true;
            }
            Object.defineProperty(AudioMgr.prototype, "musicOpen", {
                get: function () {
                    return this._musicOpen;
                },
                set: function (value) {
                    this._musicOpen = value;
                    xgame.openLog && console.log("[\u97F3\u91CF\u5927\u5C0F]---" + this._musicEffecOpen);
                    this.updateMusicOpen();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(AudioMgr.prototype, "musicEffecOpen", {
                get: function () {
                    return this._musicEffecOpen;
                },
                set: function (value) {
                    this._musicEffecOpen = value;
                    xgame.openLog && console.log("[\u97F3\u6548\u5927\u5C0F]---" + this._musicEffecOpen);
                },
                enumerable: false,
                configurable: true
            });
            AudioMgr.prototype.onUpdate = function (dt) {
            };
            AudioMgr.prototype.start = function () {
            };
            AudioMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (!xgame.getXGame().platform.isFinish)
                            return [2 /*return*/, false];
                        xgame.getXGame().platform.platformObj.addOnShow(function () { _this.resume(_this._backgroundPauseKey); });
                        xgame.getXGame().platform.platformObj.addOnHide(function () { _this._backgroundPauseKey = _this.pause(); });
                        // xgame.getXGame().platform.platformObj.onAudioInterruptionBegin(() => { this.resume() });
                        // xgame.getXGame().platform.platformObj.onAudioInterruptionEnd(() => { this.pause() });
                        return [2 /*return*/, this.isFinish = true];
                    });
                });
            };
            /**
             * 恢复音乐播放
             * @param hashCode 为null表示强制恢复音乐，会清除之前所有的暂停记录
             */
            AudioMgr.prototype.resume = function (hashCode) {
                if (hashCode === void 0) { hashCode = null; }
                xgame.openLog && console.log("[AudioMgr.resume] : \u56DE\u5230\u6E38\u620F\u4E2D... \u6062\u590D\u97F3\u4E50");
                if (hashCode != null) {
                    if (!this._pauseCodeDict[hashCode]) {
                        return;
                    }
                    else {
                        delete this._pauseCodeDict[hashCode];
                    }
                }
                else {
                    this._pauseCodeDict = {};
                }
                xgame.openLog && console.log("[AudioMgr.resume] \u6062\u590D\u80CC\u666F\u97F3\u4E50key:" + JSON.stringify(this._pauseCodeDict));
                if (Object.keys(this._pauseCodeDict).length > 0) {
                    return;
                }
                if (!this._musicOpen)
                    return;
                for (var key in this._waitPlayInfo) {
                    var element = this._waitPlayInfo[key];
                    this.playAudio(element, null, true, 1, parseInt(key));
                    console.log("[AudioMgr.resume] 恢复音乐 =>", key);
                    xgame.openLog && console.log("[AudioMgr.resume] \u6062\u590D\u97F3\u4E50 => " + element + " hashCode:" + parseInt(key));
                }
                if (cc.sys.os == cc.sys.OS_IOS) {
                    cc.audioEngine.resumeAllEffects();
                    if (!cc.audioEngine.isMusicPlaying() && this.strMusicKey) {
                        //重新恢复背景音乐
                        var tmpAudio = cc.loader.getRes(this.strMusicKey, cc.AudioClip);
                        cc.audioEngine.playMusic(tmpAudio, true);
                    }
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    cc.audioEngine.resumeAll();
                }
                this._waitPlayInfo = {};
            };
            AudioMgr.prototype.pause = function () {
                xgame.openLog && console.log("[AudioMgr.pause] : \u6E38\u620F\u8FDB\u5165\u540E\u53F0... \u6682\u505C\u97F3\u4E50");
                for (var key in this._wxPlayingCache) {
                    var element = this._wxPlayingCache[key];
                    this.stopAudio(element.hashCode);
                    if (element.needResume) {
                        this._waitPlayInfo[element.hashCode] = element.key;
                    }
                    xgame.openLog && console.log("[AudioMgr.pause] \u505C\u6B62\u97F3\u4E50 => " + element.key + " hashCode:" + parseInt(key));
                }
                var hashCodeKey = xgame.MathTools.getHashCode();
                this._pauseCodeDict[hashCodeKey] = true;
                if (cc.sys.os == cc.sys.OS_IOS) {
                    cc.audioEngine.pauseAllEffects();
                    /** 暂停背景音乐 ,(由于调用 cc.audioEngine.pauseAll(),恢复播放时背景音乐有加速bug，所以需要停止音乐，恢复播放时重新播放，避免切回前台出现播放错乱) */
                    if (cc.audioEngine.isMusicPlaying()) {
                        cc.audioEngine.stopMusic();
                    }
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    cc.audioEngine.pauseAll();
                }
                else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                }
                return hashCodeKey;
            };
            AudioMgr.prototype.updateMusicOpen = function () {
                if (this._musicOpen)
                    this.resume();
                else
                    this.pause();
            };
            AudioMgr.prototype.reset = function () {
            };
            AudioMgr.prototype.dispose = function () {
                for (var cache in this._wxPlayingCache) {
                    this._wxPlayingCache[cache].audio.destroy();
                }
                if (this._wxAudioCache.length > 0) {
                    for (var index = 0; index < this._wxAudioCache.length; index++) {
                        this._wxAudioCache[index].destroy();
                    }
                }
            };
            AudioMgr.prototype.stopMusic = function () {
                for (var key in this._wxPlayingCache) {
                    var element = this._wxPlayingCache[key];
                    this.stopAudio(element.hashCode);
                }
                cc.audioEngine.stopMusic();
            };
            AudioMgr.prototype.playAudio = function (key, call, loop, vol, hashCode) {
                if (call === void 0) { call = null; }
                if (loop === void 0) { loop = false; }
                if (vol === void 0) { vol = 1; }
                if (hashCode === void 0) { hashCode = xgame.MathTools.getHashCode(); }
                return __awaiter(this, void 0, void 0, function () {
                    var tmpAudio, useUrl;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //处理音乐开关
                                if (!this._musicOpen && loop) {
                                    this._waitPlayInfo[xgame.MathTools.getHashCode()] = key;
                                    return [2 /*return*/];
                                }
                                //处理音效
                                if (!this._musicEffecOpen && !loop) {
                                    return [2 /*return*/];
                                }
                                if (!loop && this._cacheAudioKey[key] && Date.now() - this._cacheAudioKey[key] < AudioMgr.sameKeyDelayPlayTime) {
                                    xgame.openLog && console.warn("[AudioMgr.playAudio] \u5728" + (Date.now() - this._cacheAudioKey[key]) + "\u6BEB\u79D2\u4E4B\u524D\u6709\u540C\u4E00\u97F3\u9891\u64AD\u653E:" + key);
                                    call && call(null);
                                    return [2 /*return*/];
                                }
                                this._cacheAudioKey[key] = Date.now();
                                tmpAudio = cc.loader.getRes(key, cc.AudioClip);
                                useUrl = '';
                                if (!tmpAudio) {
                                    xgame.loadRes(key, cc.AudioClip);
                                    useUrl = xgame.getAssetRemoteUrl(key);
                                }
                                else {
                                    useUrl = tmpAudio.nativeUrl;
                                }
                                if (!(cc.sys.platform === cc.sys.WECHAT_GAME)) return [3 /*break*/, 1];
                                // xgame.openLog && console.log(`[AudioMgr.playAudio] useUrl:${useUrl}`);
                                hashCode = this._wxPlayAudio(key, useUrl, loop, vol, hashCode);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, xgame.loadRes(key, cc.AudioClip)];
                            case 2:
                                tmpAudio = _a.sent();
                                if (tmpAudio) {
                                    if (loop) {
                                        hashCode = cc.audioEngine.playMusic(tmpAudio, loop);
                                        this.strMusicKey = key;
                                    }
                                    else {
                                        if (cc.sys.os == cc.sys.OS_IOS) {
                                            hashCode = cc.audioEngine.playEffect(tmpAudio, loop);
                                        }
                                        else {
                                            hashCode = cc.audioEngine.play(tmpAudio, loop, vol);
                                        }
                                    }
                                }
                                else {
                                    console.error("playAudio key load fail! key:", key);
                                }
                                _a.label = 3;
                            case 3:
                                call && call(hashCode);
                                return [2 /*return*/];
                        }
                    });
                });
            };
            AudioMgr.prototype._wxPlayAudio = function (key, url, loop, vol, hashCode) {
                var _this = this;
                if (loop === void 0) { loop = false; }
                if (vol === void 0) { vol = 1; }
                if (hashCode === void 0) { hashCode = xgame.MathTools.getHashCode(); }
                if (url.indexOf('https://') == -1) {
                    var srcUrl = url.replace(".mp3", '');
                    var replaceUrl = url.replace(new RegExp("/", "g"), '-').replace(".mp3", '');
                    url = wx.env.USER_DATA_PATH + '/gamecaches' + "/" + url;
                    if (cc.loader.md5Pipe) {
                        url = cc.loader.md5Pipe.transformURL(url);
                    }
                    url = url.replace(srcUrl, replaceUrl);
                }
                xgame.openLog && console.log("[AudioMgr._wxPlayAudio] : " + url);
                var audio = this._getWxCacheInnerAudioContext();
                audio.src = url;
                // audio.src = 'https://gamecdn.auvchat.com/res/gameRemoteRes/crimsonland/1.0.0//res/raw-assets/b6/b619ebc8-df86-49cb-978f-8972bcacc637.831f1.mp3';
                audio.loop = loop;
                audio.volume = vol;
                audio.play();
                var onEndedFun = function () {
                    // xgame.openLog && console.log(`[AudioMgr._wxPlayingCache] 播放自然结束 ${url},hashCode = ${hashCode}`);
                    var audioInfo = _this._wxPlayingCache[hashCode];
                    if (_this._wxPlayingCache[hashCode])
                        delete _this._wxPlayingCache[hashCode];
                    if (audioInfo) {
                        audioInfo.audio.offEnded(audioInfo.onEnded);
                        _this._cacheInnerAudioContext(audioInfo.audio);
                    }
                };
                this._wxPlayingCache[hashCode] = {
                    hashCode: hashCode,
                    key: key,
                    onEnded: onEndedFun,
                    audio: audio,
                    needResume: loop
                };
                // xgame.openLog && console.log(`[_wxPlayingCache] 启动播放完成 ${url} hashCode:${hashCode}`);
                audio.onEnded(onEndedFun);
                return hashCode;
            };
            AudioMgr.prototype._getWxCacheInnerAudioContext = function () {
                // xgame.openLog && console.log(`[AudioMgr._getWxCacheInnerAudioContext] 获取 缓存池数量: ${this._wxAudioCache.length} 播放中数量:${Object.keys(this._wxPlayingCache).length}`);
                // if (CC_QQPLAY) {
                //     if (this._wxAudioCache.length > 0) {
                //         let audioObj = this._wxAudioCache.pop();
                //         // audioObj.pause();
                //         return audioObj;
                //     }
                //     else {
                //         return wx.createInnerAudioContext();
                //     }
                // }
                //微信小游戏端使用缓存audio对象会导致从后台恢复后缓存对象原来的音乐继续播放问题
                if (cc.sys.platform === cc.sys.WECHAT_GAME)
                    return wx.createInnerAudioContext();
            };
            AudioMgr.prototype._cacheInnerAudioContext = function (audio) {
                // xgame.openLog && console.log(`[AudioMgr._getWxCacheInnerAudioContext] 缓存 缓存池数量: ${this._wxAudioCache.length + 1} 播放中数量:${Object.keys(this._wxPlayingCache).length}`);
                // if (CC_QQPLAY)
                //     this._wxAudioCache.push(audio);
                //微信小游戏端使用缓存audio对象会导致从后台恢复后缓存对象原来的音乐继续播放问题
                if (cc.sys.platform === cc.sys.WECHAT_GAME)
                    audio.destroy();
            };
            AudioMgr.prototype.stopAudio = function (hashCode) {
                // xgame.openLog && console.log(`[AudioMgr.stopAudio] 停止播放 ${hashCode}`);
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    if (this._wxPlayingCache[hashCode]) {
                        var audioCache = this._wxPlayingCache[hashCode].audio;
                        if (audioCache) {
                            xgame.openLog && console.log("[AudioMgr.stopAudio] - hashCode:" + hashCode);
                            audioCache.pause();
                            this._cacheInnerAudioContext(this._wxPlayingCache[hashCode].audio);
                            delete this._wxPlayingCache[hashCode];
                        }
                    }
                }
                else {
                    cc.audioEngine.stop(hashCode);
                }
            };
            /**统一音频延迟播放时间差（毫秒） */
            AudioMgr.sameKeyDelayPlayTime = 50;
            return AudioMgr;
        }());
        mgr.AudioMgr = AudioMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var DataType;
    (function (DataType) {
        DataType[DataType["cache"] = 0] = "cache";
        DataType[DataType["dynamic"] = 1] = "dynamic";
        DataType[DataType["local"] = 2] = "local";
        DataType[DataType["xgame"] = 3] = "xgame";
    })(DataType = xgame.DataType || (xgame.DataType = {}));
})(xgame || (xgame = {}));
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * 数据管理器
         */
        var DataMgr = /** @class */ (function () {
            function DataMgr() {
                /**类型数据缓冲信息 */
                this._dataArrayInfo = {};
                /**对象构造器 */
                this._dataCreator = null;
                /**是否存储到本地 */
                this._isSaveing = false;
                /**
                 * 上次存储的时间
                 */
                this.lastSaveTime = 0;
                this.needWriteLocal = false;
            }
            /**注册一个构造函数 */
            DataMgr.prototype.registerCreateFunc = function (key, func) {
                this._dataCreator.setRegister(key, func);
            };
            /**注册一个数据升级函数 */
            DataMgr.prototype.registerDataLevelUpFunc = function (key, func) {
                this._dataCreator.setLevelUpFunc(key, func);
            };
            /**
             * 获取一个数据包对象
             * @param key 数据类型枚举
             * @param dataType 要获取的数据类型
             */
            DataMgr.prototype.getData = function (key, dataType) {
                //没有指定类型直接构建
                if (dataType == undefined) {
                    return this._dataCreator.getData(key);
                }
                var keyName = this.getObjKeyName(key);
                //制定了类型，从缓冲池判定
                var tmpDataObj = this._dataArrayInfo[dataType].data;
                if (!tmpDataObj.hasOwnProperty(keyName))
                    tmpDataObj[keyName] = this._dataCreator.getData(key);
                return tmpDataObj[keyName];
            };
            /**
             * 获取指定类型的数据
             * @param dataType 要获取的数据类型
             */
            DataMgr.prototype.getTypeData = function (dataType) {
                //制定了类型，从缓冲池判定
                var tmpDataObj = this._dataArrayInfo[dataType];
                return tmpDataObj;
            };
            /**
             * 设置一个类型的数据
             * @param dataType 要获取的数据类型
             */
            DataMgr.prototype.setTypeData = function (dataType, data) {
                this._dataArrayInfo[dataType] = data;
            };
            /**
             * 获取一个数据包对象
             * @param key 数据类型枚举
             * @param dataType 要获取的数据类型
             * @param data 数据体
             */
            DataMgr.prototype.setData = function (key, dataType, data) {
                var tmpDataDict = this._dataArrayInfo[dataType].data;
                var keyName = this.getObjKeyName(key);
                tmpDataDict[keyName] = data;
            };
            /**
             * 清除一个对象的数据
             * @param key 数据类型枚举
             * @param dataType 要获取的数据类型
             */
            DataMgr.prototype.clearData = function (key, dataType) {
                var tmpDataDict = this._dataArrayInfo[dataType].data;
                var keyName = this.getObjKeyName(key);
                tmpDataDict[keyName] = this._dataCreator.getData(key);
            };
            DataMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[DataMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        if (!xgame.getXGame().platform.isFinish) {
                            return [2 /*return*/, false];
                        }
                        this._dataCreator = new xgame.DataCreator();
                        this.reset();
                        //接收onHide事件，保存一次数据
                        xgame.getXGame().platform.platformObj.addOnHide(function () {
                            xgame.openLog && console.log("[DataMgr] onHide, call writeLocalData");
                            _this.writeLocalData();
                        });
                        return [2 /*return*/, this.isFinish = true];
                    });
                });
            };
            DataMgr.prototype.start = function () {
            };
            DataMgr.prototype.reset = function () {
                this._dataArrayInfo = {};
                this._dataArrayInfo[xgame.DataType.cache] = { saveVersionCode: 0, data: {} };
                this._dataArrayInfo[xgame.DataType.dynamic] = { saveVersionCode: 0, data: {} };
                this._dataArrayInfo[xgame.DataType.local] = { saveVersionCode: 0, data: {} };
                this._dataArrayInfo[xgame.DataType.xgame] = { saveVersionCode: 0, data: {} };
                this._dataCreator.clear();
            };
            DataMgr.prototype.onUpdate = function (dt) {
                // 调用this.writeLocalData会立即更新lastSaveTime，所以不会多次调用
                if (this.needWriteLocal && (Date.now() - this.lastSaveTime) > DataMgr.saveDelayTime) {
                    this.writeLocalData();
                }
            };
            /**
             * 存储本地数据
             * 延迟写入数据，如果通帧有大量的数据需要写入，则在延迟期间不会发生真正写入操作
             */
            DataMgr.prototype.delayWriteLocalData = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.needWriteLocal = true;
                        return [2 /*return*/];
                    });
                });
            };
            /**
             * 设置本地数据Key
             * @param dataLocalKey key值
             */
            DataMgr.prototype.setLocalDataKey = function (dataLocalKey, version) {
                DataMgr.dataLocalKey = dataLocalKey;
                DataMgr.curDataVersion = version;
            };
            /**
             * 写入本地数据
             */
            DataMgr.prototype.writeLocalData = function () {
                // return;
                if (this._isSaveing) { //说明当前正在写，防止未写完再次调用
                    xgame.openLog && console.log("[DataMgr.writeLocalData] \u4E0A\u6B21\u5199\u5165\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u4E0A\u6B21\u5B8C\u6210");
                    return;
                }
                this._isSaveing = true;
                //记录性能数据，及上次保存时间
                var now = Date.now();
                var st = now; //开始写入的时间
                var interval = this.lastSaveTime > 0 ? now - this.lastSaveTime : 0; //距离上次保存的延迟
                this.lastSaveTime = now;
                if (DataMgr.dataLocalKey && DataMgr.isSaveLocal) {
                    var str = JSON.stringify(this._dataArrayInfo[xgame.DataType.local]);
                    // xgame.openLog && console.log(`[写入本地数据] - ${str}`);
                    var dataKey = "xgame_" + DataMgr.dataLocalKey + "_data";
                    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                        var that_1 = this;
                        wx.setStorage({
                            key: dataKey,
                            data: str,
                            success: function (res) {
                                that_1._isSaveing = false;
                            },
                            fail: function (res) {
                                that_1._isSaveing = false;
                                xgame.openLog && console.error("[DataMgr.writeLocalData] \u5199\u5165\u5B58\u6863\u5931\u8D25");
                            }
                        });
                        wx.setStorage({
                            key: "xgame_" + DataMgr.dataLocalKey + "_data_version",
                            data: DataMgr.curDataVersion,
                            success: function (res) {
                                that_1._isSaveing = false;
                            },
                            fail: function (res) {
                                that_1._isSaveing = false;
                                xgame.openLog && console.error("[DataMgr.writeLocalData] \u5199\u5165\u5B58\u6863\u5931\u8D25");
                            }
                        });
                    }
                    else {
                        try {
                            cc.sys.localStorage.setItem(dataKey, str);
                        }
                        catch (e) {
                            xgame.openLog && console.error("[DataMgr.writeLocalData] \u5199\u5165\u5B58\u6863\u5931\u8D25");
                        }
                        finally {
                            this._isSaveing = false;
                        }
                    }
                }
                else {
                    xgame.openLog && console.error("[DataMgr.writeLocalData] \u6570\u636E\u5B58\u50A8\u5931\u8D25\uFF0C\u672A\u8BBE\u7F6E\u672C\u5730\u5B58\u50A8Key");
                    this._isSaveing = false;
                }
                // 打印性能数据
                xgame.openLog && console.log("[DataMgr.writeLocalData] \u6D88\u8017: " + (Date.now() - st) + " ms, \u95F4\u9694\uFF1A" + interval + " ms");
            };
            /**
             * 读取本地数据
             * @wangjl 修订
             * @des 此方法只能在初始化地方调用一次
             */
            DataMgr.prototype.readLocalData = function () {
                if (DataMgr.dataLocalKey) {
                    //开始读档
                    var str = cc.sys.localStorage.getItem("xgame_" + DataMgr.dataLocalKey + "_data");
                    xgame.isDebug && console.log("[\u8BFB\u53D6\u672C\u5730\u6570\u636E] : < " + str + " >");
                    if (str) {
                        var saveData = JSON.parse(str);
                        /** 框架数据升级 - 兼容线上数据 */
                        if (saveData.saveVersionCode === undefined) {
                            var saveVersionCode = this.fixVersionInfo();
                            this._dataArrayInfo[xgame.DataType.local] = {
                                saveVersionCode: saveVersionCode,
                                data: saveData
                            };
                        }
                        else {
                            this._dataArrayInfo[xgame.DataType.local] = saveData;
                        }
                        DataMgr.isSaveLocal = false; //修正数据前修改存储标记为false，如果修正数据中异常，则异常后的数据不会存储到本地
                        this.repairData(xgame.DataType.local);
                        DataMgr.isSaveLocal = true;
                        DataMgr.isHaveLocalDataCurGame = true;
                    }
                    else {
                        this._dataArrayInfo[xgame.DataType.local] = {
                            saveVersionCode: DataMgr.curDataVersion,
                            data: {}
                        };
                        DataMgr.isHaveLocalDataCurGame = false;
                    }
                }
                else {
                    xgame.openLog && console.error("[DataMgr.readLocalData] \u8BFB\u53D6\u5B58\u50A8\u6570\u636E\u5931\u8D25\uFF0C\u4E3A\u8BBE\u7F6E\u672C\u5730\u5B58\u50A8Key");
                }
            };
            /**
             * 设置数据
             * @wangjl 修订
             * @des 此方法只能在初始化地方调用一次
             */
            DataMgr.prototype.setLocalData = function (dataStr) {
            };
            /**
             * 数据对象发生变化的时候，本地存档或云存档获取到的数据会发生错误，此处修正数据
             */
            DataMgr.prototype.repairData = function (dataType) {
                var curDataVersion = DataMgr.curDataVersion;
                var saveData = this._dataArrayInfo[dataType];
                var data = this._dataArrayInfo[dataType].data;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var srcData = data[key];
                        var tmpNumKey = this.getObjKeyNum(key);
                        var defaultData = this._dataCreator.getData(tmpNumKey);
                        var deepNum = 1;
                        //没有初始化过的本地数据读取出来的时候会是null而不是undefined
                        if (srcData === undefined) {
                            data[key] = defaultData;
                        }
                        else {
                            //修正不存在的对象
                            xgame.fixData(srcData, defaultData, deepNum);
                        }
                    }
                }
                //修正升级数据
                var curLevelUpVersion = saveData.saveVersionCode;
                while (curLevelUpVersion < curDataVersion) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var srcData = data[key];
                            var tmpNumKey = this.getObjKeyNum(key);
                            var newData = this._dataCreator.levelUpData(tmpNumKey, curLevelUpVersion, curLevelUpVersion + 1, srcData);
                            if (newData != null) {
                                data[key] = newData;
                            }
                        }
                    }
                    xgame.openLog && console.log("[DataMgr.repairData] \u6570\u636E\u5347\u7EA7\u7248\u672C\u53F7 : from:" + curLevelUpVersion + " to:" + (curLevelUpVersion + 1));
                    curLevelUpVersion++;
                }
                xgame.openLog && console.log("[DataMgr.repairData] \u6570\u636E\u5347\u7EA7\u5B8C\u6210\u672C\u5730\u6570\u636E\u7248\u672C\u53F7 :" + data.saveVersionCode);
                if (saveData.saveVersionCode < curDataVersion)
                    saveData.saveVersionCode = curDataVersion;
            };
            /**
             * 获取key的字典名字
             * @param key 指定key
             */
            DataMgr.prototype.getObjKeyName = function (key) {
                return "key_" + key;
            };
            /**
             * 获取key的字典名字
             * @param key 指定key
             */
            DataMgr.prototype.getObjKeyNum = function (key) {
                return parseInt(key.replace("key_", ''));
            };
            DataMgr.prototype.dispose = function () {
                this.reset();
                delete this._dataCreator;
            };
            DataMgr.prototype.fixVersionInfo = function () {
                var tmpVersion = cc.sys.localStorage.getItem("xgame_" + DataMgr.dataLocalKey + "_data_version");
                xgame.openLog && console.log("[DataMgr.readLocalData] \u672C\u5730\u6570\u636E\u7248\u672C\u53F7:" + tmpVersion);
                var oldDataVersion = 0;
                if (tmpVersion != null) {
                    oldDataVersion = typeof (tmpVersion) == 'number' ? tmpVersion : parseInt(tmpVersion);
                    if (isNaN(oldDataVersion))
                        oldDataVersion = 0;
                }
                return oldDataVersion;
            };
            DataMgr.prototype.restoreLocalData = function (data) {
                this.setTypeData(xgame.DataType.local, data);
                this.needWriteLocal = false;
                this._isSaveing = false; //强制设置正在写的标志，一定要写入
                this.writeLocalData();
                DataMgr.isSaveLocal = false;
                cc.audioEngine.stopAll();
                cc.game.pause();
                cc.sys.restartVM();
            };
            /**
             * 删档
             */
            DataMgr.clearLocalData = function () {
                var dataKey = "xgame_" + DataMgr.dataLocalKey + "_data";
                var dataVersionKey = "xgame_" + DataMgr.dataLocalKey + "_data_version";
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    wx.removeStorage({ key: dataKey });
                    wx.removeStorage({ key: dataVersionKey });
                }
                else {
                    cc.sys.localStorage.removeItem(dataKey);
                    cc.sys.localStorage.removeItem(dataVersionKey);
                }
            };
            //是否存档
            DataMgr.isSaveLocal = true;
            /** 本地是否有数据 */
            DataMgr.isHaveLocalDataCurGame = false;
            /**数据在本地的key */
            DataMgr.dataLocalKey = null;
            /**旧数据版本号 */
            DataMgr.oldDataVersion = 0;
            /**当前数据版本号 */
            DataMgr.curDataVersion = 0;
            /**延迟存储间隔时间(毫秒) */
            DataMgr.saveDelayTime = 2000; //默认2秒
            return DataMgr;
        }());
        mgr.DataMgr = DataMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var DataCreator = /** @class */ (function () {
        function DataCreator() {
            /**数组更快 */
            this._dataDefaultFunc = {};
            /**数据修正绑定函数 */
            this._dataLevelUpFunc = {};
        }
        /**
         *
         * @param key 注册的key
         * @param func key对应的默认构造方法
         */
        DataCreator.prototype.setRegister = function (key, func) {
            var keyName = xgame.getXGame().data.getObjKeyName(key);
            this._dataDefaultFunc[keyName] = func;
        };
        /**
         *
         * @param key 注册的key
         * @param func key对应的默认构造方法
         */
        DataCreator.prototype.setLevelUpFunc = function (key, func) {
            var keyName = xgame.getXGame().data.getObjKeyName(key);
            this._dataLevelUpFunc[keyName] = func;
        };
        DataCreator.prototype.levelUpData = function (key, oldVersion, curVersion, data) {
            var keyName = xgame.getXGame().data.getObjKeyName(key);
            if (this._dataLevelUpFunc[keyName]) {
                return this._dataLevelUpFunc[keyName](oldVersion, curVersion, data);
            }
            return data;
        };
        /**
         * 获取一个指定key类型的对象
         * @param key 指定要构建对象的key
         */
        DataCreator.prototype.getData = function (key) {
            var result = undefined;
            var keyName = xgame.getXGame().data.getObjKeyName(key);
            if (this._dataDefaultFunc[keyName] === undefined)
                result = {};
            else
                result = this._dataDefaultFunc[keyName]();
            result.serialID = xgame.MathTools.getHashCode();
            return result;
        };
        DataCreator.prototype.clear = function () {
            for (var key in this._dataDefaultFunc) {
                delete this._dataDefaultFunc[key];
            }
            this._dataDefaultFunc = [];
        };
        return DataCreator;
    }());
    xgame.DataCreator = DataCreator;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var socket;
    (function (socket) {
        //服务器回调枚举
        var EnumResultType;
        (function (EnumResultType) {
            //默认成功
            EnumResultType[EnumResultType["OK"] = 0] = "OK";
            //,★1~500为严重错误 (保留使用)
            //501~999为通用错误
            EnumResultType[EnumResultType["Error"] = 501] = "Error";
        })(EnumResultType = socket.EnumResultType || (socket.EnumResultType = {}));
    })(socket = xgame.socket || (xgame.socket = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * 数据管理器
         */
        var NetworkMgr = /** @class */ (function (_super) {
            __extends(NetworkMgr, _super);
            function NetworkMgr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**等待发送的数据 */
                _this._waitSendEvents = {};
                //当前在连接中的socket对象
                _this.socket = null;
                return _this;
            }
            Object.defineProperty(NetworkMgr.prototype, "gameSocket", {
                get: function () {
                    return this.socket;
                },
                enumerable: false,
                configurable: true
            });
            NetworkMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[NetworkMgrs - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        this.reset();
                        return [2 /*return*/, this.isFinish = true];
                    });
                });
            };
            NetworkMgr.prototype.start = function () {
            };
            // ================ 网络状态处理 ==================
            NetworkMgr.prototype.onOpen = function (msg) {
                xgame.openLog && console.log("[NetworkMgr] onOpen " + JSON.stringify(msg));
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkOpen);
            };
            NetworkMgr.prototype.onMessage = function (data) {
                var tmpSocketEventData = null;
                if (this._waitSendEvents.hasOwnProperty(data.optHashCode)) {
                    var tmpWaitData = this._waitSendEvents[data.optHashCode];
                    tmpSocketEventData = tmpWaitData;
                    delete this._waitSendEvents[data.optHashCode];
                }
                else {
                    tmpSocketEventData = {};
                }
                tmpSocketEventData.result = data.result;
                tmpSocketEventData.msg = data.errorcode;
                tmpSocketEventData.recvData = data;
                xgame.openLog && console.log("[NetworkMgr] onMessage " + JSON.stringify(data));
                this.emit(xSystem.EnumNetEventkey[data.protoID], tmpSocketEventData);
            };
            NetworkMgr.prototype.onClose = function (msg) {
                xgame.openLog && console.log("[NetworkMgr] onClose");
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkClose);
                this.onDestorySocket();
            };
            NetworkMgr.prototype.onError = function (msg) {
                xgame.openLog && console.log("[NetworkMgr] onError " + JSON.stringify(msg));
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkError);
                this.onDestorySocket();
            };
            NetworkMgr.prototype.onDestorySocket = function () {
                if (this.socket) {
                    this.socket.close();
                    this.disposeSocketObject(this.socket);
                    xgame.openLog && console.warn("[NetoworkMgr] : onDestorySocket \u6210\u529F\u9500\u6BC1socket " + this.socket.hashCode);
                    delete this.socket;
                }
                else {
                    xgame.openLog && console.warn("[NetoworkMgr] : onDestorySocket socket\u5BF9\u8C61\u4E0D\u5B58\u5728,\u65E0\u6CD5\u9500\u6BC1");
                }
            };
            NetworkMgr.prototype.close = function () {
                if (this.socket) {
                    xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkClose);
                    this.onDestorySocket();
                }
                else {
                    xgame.openLog && console.warn("[NetoworkMgr.close] socket\u5BF9\u8C61\u4E0D\u5B58\u5728,\u65E0\u6CD5\u9500\u6BC1");
                }
            };
            /**
             * 发送数据到服务器
             * @param data 发送的数据结构
             */
            NetworkMgr.prototype.send = function (data, isWaitCallBack) {
                if (isWaitCallBack === void 0) { isWaitCallBack = true; }
                if (!data) {
                    xgame.openLog && console.error("[NetworkMgr.send] \u53D1\u9001\u7F51\u7EDC\u6570\u636E\u7684\u65F6\u5019\uFF0C\u6570\u636E\u4F53\u4E0D\u80FD\u4E3A\u7A7A");
                    return;
                }
                var sendEventData = {};
                sendEventData.sendData = data;
                if (isWaitCallBack) {
                    this._waitSendEvents[data.optHashCode] = sendEventData;
                }
                if (this.socket) {
                    this.socket.send(sendEventData.sendData);
                }
                else {
                    xgame.openLog && console.log("[NetworkMgr] \u53D1\u9001\u6570\u636E\u5931\u8D25\uFF0Csocket\u4E0D\u5B58\u5728");
                }
            };
            /**
             * 链接一个网络
             * @param host 链接地址
             */
            NetworkMgr.prototype.open = function (host) {
                if (this.socket) {
                    console.warn("[NetoworkMgr] : \u94FE\u63A5\u5931\u8D25 socket \u5DF2\u8FDE\u63A5");
                    return;
                }
                this.socket = this.createSocketObject();
                this.socket.open(host);
                return this.socket.hashCode;
            };
            NetworkMgr.prototype.reset = function () {
                this.close();
            };
            NetworkMgr.prototype.onUpdate = function (dt) {
            };
            NetworkMgr.prototype.dispose = function () {
                this.reset();
            };
            // ============= 私有函数 ================
            /**
             * 构建一个socket对象
             * @param socket.AGameNet socket对象
             */
            NetworkMgr.prototype.createSocketObject = function () {
                var newSocket = null;
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    newSocket = new xgame.socket.WxWebSocket();
                }
                else {
                    newSocket = new xgame.socket.H5WebSocket();
                }
                //添加监听事件
                newSocket.on(xgame.socket.xgame_net_open, this.onOpen, this);
                newSocket.on(xgame.socket.xgame_net_close, this.onClose, this);
                newSocket.on(xgame.socket.xgame_net_recvdata, this.onMessage, this);
                newSocket.on(xgame.socket.xgame_net_error, this.onError, this);
                return newSocket;
            };
            /**
             * 销毁一个socket对象
             * @param socket.AGameNet socket对象
             */
            NetworkMgr.prototype.disposeSocketObject = function (socket) {
                //添加监听事件
                socket.off(xgame.socket.xgame_net_open, this.onOpen, this);
                socket.off(xgame.socket.xgame_net_close, this.onClose, this);
                socket.off(xgame.socket.xgame_net_recvdata, this.onMessage, this);
                socket.off(xgame.socket.xgame_net_error, this.onError, this);
            };
            /**显示等待消息队列 */
            NetworkMgr.prototype.showWaitingListInfo = function () {
                var waitProtoIDs = [];
                for (var waitHashCode in this._waitSendEvents) {
                    waitProtoIDs.push(xSystem.EnumNetEventkey[this._waitSendEvents[waitHashCode].sendData.protoID]);
                }
                xgame.openLog && console.log("[NetworkMgr.showWaitingListInfo] " + waitProtoIDs);
            };
            return NetworkMgr;
        }(cc.EventTarget));
        mgr.NetworkMgr = NetworkMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var socket;
    (function (socket) {
        /**socket通用事件类型 */
        socket.xgame_net_error = 'xgame_net_error';
        socket.xgame_net_close = 'xgame_net_close';
        socket.xgame_net_open = 'xgame_net_open';
        socket.xgame_net_recvdata = 'xgame_net_recvdata';
        /**
         * socket基类
         */
        var ASocket = /** @class */ (function (_super) {
            __extends(ASocket, _super);
            function ASocket() {
                var _this = _super.call(this) || this;
                _this._hashCode = xgame.MathTools.getHashCode();
                return _this;
            }
            Object.defineProperty(ASocket.prototype, "state", {
                /**socket状态 */
                get: function () {
                    return WebSocket.CLOSED;
                },
                enumerable: false,
                configurable: true
            });
            ;
            Object.defineProperty(ASocket.prototype, "hashCode", {
                get: function () {
                    return this._hashCode;
                },
                enumerable: false,
                configurable: true
            });
            // ========== 回调函数 ================
            ASocket.prototype.onOpen = function (msg) {
                var evtData = { socketID: this.hashCode, msg: msg };
                xgame.openLog && console.log("[AGameNet] onOpen socket \u94FE\u63A5\u6210\u529F:" + JSON.stringify(msg));
                this.emit(socket.xgame_net_open, evtData);
            };
            ASocket.prototype.onMessage = function (data) {
                var tmpData = this.decodeData(data.data);
                tmpData.socketID = this.hashCode;
                xgame.openLog && console.log("[AGameNet] onMessage data:" + JSON.stringify(tmpData));
                this.emit(socket.xgame_net_recvdata, tmpData);
            };
            ASocket.prototype.onClose = function (msg) {
                var evtData = { socketID: this.hashCode, msg: msg };
                xgame.openLog && console.log("[AGameNet] onClose socket \u65AD\u5F00\u94FE\u63A5:" + JSON.stringify(msg));
                this.emit(socket.xgame_net_close, evtData);
                this.onDestorySocket();
            };
            ASocket.prototype.onError = function (msg) {
                var evtData = { socketID: this.hashCode, msg: msg };
                xgame.openLog && console.log("[AGameNet] onError socket \u5F02\u5E38\u94FE\u63A5:" + JSON.stringify(msg));
                this.emit(socket.xgame_net_error, evtData);
                this.onDestorySocket();
            };
            /**
             * 获取Base64后的数据
             * @param data 要编码的数据
             */
            ASocket.prototype.decodeData = function (data) {
                var byte = new xgame.ByteArray(data);
                var base64Str = byte.readUTFBytes(byte.length);
                var tmpBytes = new xgame.ByteArray(xgame.Base64Util.decode(base64Str));
                return JSON.parse(tmpBytes.readUTFBytes(tmpBytes.length));
            };
            /**
             * 获取Base64后的数据
             * @param data 要编码的数据
             */
            ASocket.prototype.encodeData = function (data) {
                var tmpMainByteArr = new xgame.ByteArray();
                tmpMainByteArr.writeUTFBytes(JSON.stringify(data));
                var base64Str = xgame.Base64Util.encode(tmpMainByteArr.buffer);
                tmpMainByteArr.clear();
                tmpMainByteArr.writeUTFBytes(base64Str);
                tmpMainByteArr.position = 0;
                return tmpMainByteArr.buffer;
            };
            return ASocket;
        }(cc.EventTarget));
        socket.ASocket = ASocket;
    })(socket = xgame.socket || (xgame.socket = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var socket;
    (function (socket) {
        /**
         * socket基类
         */
        var H5WebSocket = /** @class */ (function (_super) {
            __extends(H5WebSocket, _super);
            function H5WebSocket() {
                return _super.call(this) || this;
            }
            Object.defineProperty(H5WebSocket.prototype, "state", {
                get: function () {
                    if (this.socket)
                        return this.socket.readyState;
                    return WebSocket.CLOSED;
                },
                enumerable: false,
                configurable: true
            });
            H5WebSocket.prototype.onDestorySocket = function () {
                if (this.socket) {
                    this.socket.onopen = null;
                    this.socket.onmessage = null;
                    this.socket.onclose = null;
                    this.socket.onerror = null;
                    delete this.socket;
                }
            };
            H5WebSocket.prototype.close = function () {
                if (this.socket) {
                    this.socket.close(1000, "正常关闭");
                }
                else {
                    xgame.openLog && console.log("[H5WebSocket] close socket\u4E0D\u5B58\u5728\uFF0C\u65E0\u6CD5\u5173\u95ED");
                }
                xgame.openLog && console.log("[H5WebSocket] close");
            };
            H5WebSocket.prototype.send = function (data) {
                if (!this.socket || this.socket.readyState != WebSocket.OPEN) {
                    xgame.openLog && console.log("[H5WebSocket] \u65E0\u6CD5\u53D1\u9001\u6570\u636E\u72B6\u6001\u4E0D\u5BF9:" + (this.socket && this.socket.readyState));
                    return;
                }
                xgame.openLog && console.log("[H5WebSocket] send : " + JSON.stringify(data));
                data.socketID = this.hashCode;
                this.socket.send(this.encodeData(data));
            };
            H5WebSocket.prototype.open = function (host) {
                if (this.socket) {
                    xgame.openLog && console.log("[H5WebSocket] open socket\u5DF2\u5B58\u5728\uFF0C\u65E0\u6CD5\u94FE\u63A5 state:" + this.socket.readyState);
                    return null;
                }
                this.socket = new WebSocket(host);
                this.socket.binaryType = 'arraybuffer';
                this.socket.onopen = this.onOpen.bind(this);
                this.socket.onmessage = this.onMessage.bind(this);
                this.socket.onclose = this.onClose.bind(this);
                this.socket.onerror = this.onError.bind(this);
                xgame.openLog && console.log("[H5WebSocket] open : " + JSON.stringify(host));
                return this.hashCode;
            };
            return H5WebSocket;
        }(socket.ASocket));
        socket.H5WebSocket = H5WebSocket;
    })(socket = xgame.socket || (xgame.socket = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var socket;
    (function (socket) {
        /**
         * socket基类
         */
        var WxWebSocket = /** @class */ (function (_super) {
            __extends(WxWebSocket, _super);
            function WxWebSocket() {
                var _this = _super.call(this) || this;
                //WebSocket.CONNECTING	0
                // WebSocket.OPEN	1
                // WebSocket.CLOSING	2
                // WebSocket.CLOSED	3
                _this._state = WebSocket.CLOSED;
                return _this;
            }
            Object.defineProperty(WxWebSocket.prototype, "state", {
                get: function () {
                    return this._state;
                },
                enumerable: false,
                configurable: true
            });
            WxWebSocket.prototype.onOpen = function (msg) {
                _super.prototype.onOpen.call(this, msg);
                this._state = WebSocket.OPEN;
            };
            WxWebSocket.prototype.onClose = function (msg) {
                _super.prototype.onClose.call(this, msg);
                this._state = WebSocket.CLOSED;
            };
            WxWebSocket.prototype.onError = function (msg) {
                _super.prototype.onError.call(this, msg);
                this._state = WebSocket.CLOSED;
            };
            WxWebSocket.prototype.onDestorySocket = function () {
                if (this.socket) {
                    this.socket.onError(null);
                    this.socket.onMessage(null);
                    this.socket.onClose(null);
                    this.socket.onError(null);
                    delete this.socket;
                    xgame.openLog && console.log("[WxWebSocket] : \u9500\u6BC1WxWebSocket");
                }
            };
            WxWebSocket.prototype.close = function () {
                xgame.openLog && console.log("[WxWebSocket] close");
                this._state = WebSocket.CLOSING;
                if (this.socket) {
                    this.socket.close({ code: 1000, reason: "正常关闭" });
                }
                else {
                    xgame.openLog && console.error("[WxWebSocket] \u5173\u95ED\u5931\u8D25 socket \u94FE\u63A5\u4E0D\u5B58\u5728");
                }
            };
            WxWebSocket.prototype.send = function (data) {
                if (!this.socket || this._state != WebSocket.OPEN) {
                    xgame.openLog && console.log("[WxWebSocket] \u65E0\u6CD5\u53D1\u9001\u6570\u636E\u72B6\u6001\u4E0D\u5BF9:" + this._state);
                    return;
                }
                xgame.openLog && console.log("[WxWebSocket] send : " + JSON.stringify(data));
                data.socketID = this.hashCode;
                this.socket.send({
                    data: this.encodeData(data)
                });
            };
            WxWebSocket.prototype.open = function (host) {
                if (this.socket) {
                    xgame.openLog && console.warn("[WxWebSocket] \u5F53\u524D socket \u5B58\u5728\uFF0C\u65E0\u6CD5\u7EE7\u7EED\u521B\u5EFA");
                    return null;
                }
                this._state = WebSocket.CONNECTING;
                this.socket = wx.connectSocket({
                    url: host,
                    header: {},
                    method: "post",
                    protocols: [],
                });
                if (this.socket) {
                    this.socket.onOpen(this.onOpen.bind(this));
                    this.socket.onMessage(this.onMessage.bind(this));
                    this.socket.onClose(this.onClose.bind(this));
                    this.socket.onError(this.onError.bind(this));
                    xgame.openLog && console.log("[WxWebSocket] open : " + JSON.stringify(host));
                }
                else {
                    xgame.openLog && console.error("[WxWebSocket] open : \u94FE\u63A5\u9519\u8BEF");
                }
                return this.hashCode;
            };
            return WxWebSocket;
        }(socket.ASocket));
        socket.WxWebSocket = WxWebSocket;
    })(socket = xgame.socket || (xgame.socket = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        // 平台类型
        var EnumPlatformType;
        (function (EnumPlatformType) {
            EnumPlatformType[EnumPlatformType["Debug"] = -1] = "Debug";
            EnumPlatformType[EnumPlatformType["None"] = 0] = "None";
            EnumPlatformType[EnumPlatformType["TT"] = 1] = "TT";
            EnumPlatformType[EnumPlatformType["wxgame"] = 2] = "wxgame";
            EnumPlatformType[EnumPlatformType["Dy"] = 3] = "Dy";
        })(EnumPlatformType = platform.EnumPlatformType || (platform.EnumPlatformType = {}));
        // 平台子类型
        var EnumPlatformSubType;
        (function (EnumPlatformSubType) {
            EnumPlatformSubType[EnumPlatformSubType["None"] = 0] = "None";
            EnumPlatformSubType[EnumPlatformSubType["Base"] = 1] = "Base";
            EnumPlatformSubType[EnumPlatformSubType["Ly"] = 2] = "Ly";
        })(EnumPlatformSubType = platform.EnumPlatformSubType || (platform.EnumPlatformSubType = {}));
        /**
         * 基础类
         */
        var BasePlatform = /** @class */ (function () {
            function BasePlatform() {
                /**平台类型 */
                this.type = EnumPlatformType.Debug;
                /**平台子类型 */
                this.subType = EnumPlatformSubType.Base;
            }
            BasePlatform.prototype.showGetUserInfoBtn = function (left, top, w, h, call) {
                var timer = new Date().getTime();
                var userInfo = { nickName: "username" + timer, uid: timer, avatarUrl: 'ui_game_nainainotice_png' };
                call && call(userInfo);
                return { destroy: function () { } };
            };
            BasePlatform.prototype.getSystemInfo = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            };
            BasePlatform.prototype.getNetworkType = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            };
            BasePlatform.prototype.login = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, {}];
                }); });
            };
            BasePlatform.prototype.addADKey = function (key, classPath) { };
            BasePlatform.prototype.postMessage = function (data) { };
            BasePlatform.prototype.showAd = function (key, classPath, ritSceneDescribe) {
                if (ritSceneDescribe === void 0) { ritSceneDescribe = ""; }
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xgame.wait(300)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, { result: true, eventKey: xgame.AdEventKey.playOver }];
                        }
                    });
                });
            };
            //显示banner
            BasePlatform.prototype.showBanner = function (key, style, adIntervals) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, xgame.AdEventKey.playOver];
                    });
                });
            };
            BasePlatform.prototype.showInterstitial = function (key) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, xgame.AdEventKey.playOver];
                    });
                });
            };
            BasePlatform.prototype.hideBanner = function () { };
            BasePlatform.prototype.share = function (targetObj) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xgame.wait(2000)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
            };
            BasePlatform.prototype.addOnHide = function (callback) {
                cc.game.on(cc.game.EVENT_HIDE, callback);
            };
            BasePlatform.prototype.addOnShow = function (callback) {
                cc.game.on(cc.game.EVENT_SHOW, callback);
            };
            BasePlatform.prototype.removeOnHide = function (callback) {
                cc.game.off(cc.game.EVENT_HIDE, callback);
            };
            BasePlatform.prototype.removeOnShow = function (callback) {
                cc.game.off(cc.game.EVENT_SHOW, callback);
            };
            BasePlatform.prototype.onAudioInterruptionEnd = function (callback) { };
            BasePlatform.prototype.onAudioInterruptionBegin = function (callback) { };
            BasePlatform.prototype.showGameClubButton = function (isShow) { };
            BasePlatform.prototype.setShareAppMessage = function (configObj) { };
            BasePlatform.prototype.exit = function () { };
            /**分享视频接口 */
            BasePlatform.prototype.shareVideo = function (targetObj) { };
            /**显示确认取消弹出窗口 */
            BasePlatform.prototype.showModel = function (title, content) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, true];
                    });
                });
            };
            ;
            BasePlatform.prototype.vibrateShort = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, true];
                    });
                });
            };
            BasePlatform.prototype.vibrateLong = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, true];
                    });
                });
            };
            //发送https get 请求
            BasePlatform.prototype.getURL = function (targetUrl, keyValue) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // console.log(`[BasePlatform.getURL] getUrl url:${targetUrl} ${JSON.stringify(keyValue)}`);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var tmpHttpRequest = cc.loader.getXMLHttpRequest();
                                tmpHttpRequest.onerror = function (ev) {
                                    console.error("[BasePlatform.getURL] onerror url:" + targetUrl + " " + JSON.stringify(ev) + " readyState:" + tmpHttpRequest.readyState + " status:" + tmpHttpRequest.status + " response:" + tmpHttpRequest.response + " " + JSON.stringify(keyValue));
                                    resolve(null);
                                };
                                tmpHttpRequest.ontimeout = function (ev) {
                                    console.error("[BasePlatform.getURL] ontimeout url:" + targetUrl + " readyState:" + tmpHttpRequest.readyState + " status:" + tmpHttpRequest.status + " response:" + tmpHttpRequest.response + " " + JSON.stringify(keyValue));
                                    resolve(null);
                                };
                                if (keyValue != null) {
                                    var connector = targetUrl.indexOf('?') > 0 ? '&' : '?';
                                    var encodeUrl = "" + targetUrl + connector + xgame.transRequestParamWithEncode(keyValue);
                                    tmpHttpRequest.open('GET', encodeUrl);
                                }
                                else {
                                    tmpHttpRequest.open('GET', targetUrl);
                                }
                                // tmpHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
                                tmpHttpRequest.onreadystatechange = function () {
                                    //readyState  // 0：尚未初始化 1：正在加载 2：加载完毕 3：正在处理 4：处理完毕
                                    //status // 200 请求成功 202 请求被接受但处理未完成 400 错误请求 404 请求资源未找到 500 内部服务器错误
                                    // console.log(`[BasePlatform.getURL] readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response}`);
                                    if (tmpHttpRequest.readyState === 4) {
                                        if (tmpHttpRequest.status >= 200 && tmpHttpRequest.status < 300) {
                                            var respone = tmpHttpRequest.response;
                                            try {
                                                resolve(JSON.parse(respone));
                                            }
                                            catch (error) {
                                            }
                                            finally {
                                                resolve(respone);
                                            }
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    }
                                };
                                tmpHttpRequest.send();
                            })];
                    });
                });
            };
            //发送https post请求
            BasePlatform.prototype.postURL = function (targetUrl, sendData, headers) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var tmpHttpRequest = cc.loader.getXMLHttpRequest();
                                tmpHttpRequest.responseType = 'text';
                                tmpHttpRequest.open('POST', targetUrl);
                                tmpHttpRequest.setRequestHeader("Content-Type", "text/json");
                                if (headers) {
                                    for (var key in headers) {
                                        tmpHttpRequest.setRequestHeader(key, headers[key]);
                                    }
                                }
                                tmpHttpRequest.onerror = function (ev) {
                                    console.error("[BasePlatform.postURL] onerror url:" + targetUrl + " " + JSON.stringify(ev) + " readyState:" + tmpHttpRequest.readyState + " status:" + tmpHttpRequest.status + " response:" + tmpHttpRequest.response);
                                    resolve(null);
                                };
                                tmpHttpRequest.ontimeout = function (ev) {
                                    console.error("[BasePlatform.postURL] ontimeout url:" + targetUrl + " readyState:" + tmpHttpRequest.readyState + " status:" + tmpHttpRequest.status + " response:" + tmpHttpRequest.response);
                                    resolve(null);
                                };
                                tmpHttpRequest.onreadystatechange = function () {
                                    //readyState // 0：尚未初始化 // 1：正在加载 // 2：加载完毕 // 3：正在处理 // 4：处理完毕
                                    //status // 200 请求成功 // 202 请求被接受但处理未完成 // 400 错误请求 // 404 请求资源未找到 // 500 内部服务器错误
                                    // console.log(`[BasePlatform.postURL] readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status}`);
                                    if (tmpHttpRequest.readyState === 4) {
                                        if (tmpHttpRequest.status >= 200 && tmpHttpRequest.status < 300) {
                                            var respone = tmpHttpRequest.response;
                                            try {
                                                resolve(JSON.parse(respone));
                                            }
                                            catch (error) {
                                            }
                                            finally {
                                                resolve(respone);
                                            }
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    }
                                };
                                var bodyStr = (typeof sendData === 'string') ? sendData : JSON.stringify(sendData);
                                // console.log(`[BasePlatform.sendPostURL] 发送 -> ${bodyStr}`);
                                tmpHttpRequest.send(bodyStr);
                            })];
                    });
                });
            };
            /** 支付接口 */
            BasePlatform.prototype.pay = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { code: 0 }];
                    });
                });
            };
            BasePlatform.isDebug = false;
            return BasePlatform;
        }());
        platform.BasePlatform = BasePlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
///<reference path="./BasePlatform.ts" />
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        var NativePlatform = /** @class */ (function (_super) {
            __extends(NativePlatform, _super);
            function NativePlatform() {
                var _this = _super.call(this) || this;
                /**
                 * 当前显示的 banner 唯一ID
                 */
                _this.bannerSerialID = null;
                /**
                 * 视频缓存
                 */
                _this.cacheAdHandleDict = {};
                _this.isCacheing = false;
                xgame.WxAdCtrl.isLoad = true;
                return _this;
            }
            NativePlatform.prototype.addADKey = function (key, classPath, delayTime) {
                if (delayTime === void 0) { delayTime = 0; }
                return __awaiter(this, void 0, void 0, function () {
                    var result, index;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this.cacheAdHandleDict[key] && this.cacheAdHandleDict[key].length > 0)
                                    return [2 /*return*/, { result: true }];
                                if (classPath == null)
                                    return [2 /*return*/, { result: false }];
                                if (this.isCacheing)
                                    return [2 /*return*/, { result: false }];
                                this.isCacheing = true;
                                result = { result: false };
                                index = 0;
                                _a.label = 1;
                            case 1:
                                if (!(index < 5)) return [3 /*break*/, 4];
                                console.error("[IOSPlatform.addADKey] \u7F13\u5B58\u5E7F\u544A\u4FE1\u606F \u7F13\u5B58\u6B21\u6570:" + index);
                                return [4 /*yield*/, this.cacheAd(key, classPath, delayTime)];
                            case 2:
                                result = _a.sent();
                                if (result.result) {
                                    return [3 /*break*/, 4];
                                }
                                _a.label = 3;
                            case 3:
                                index++;
                                return [3 /*break*/, 1];
                            case 4:
                                this.isCacheing = false;
                                console.error("[IOSPlatform.addADKey] \u7ED3\u679C:" + JSON.stringify(result));
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            NativePlatform.prototype.share = function (targetObj) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            NativePlatform.prototype.cacheAd = function (key, classPath, delayTime) {
                if (delayTime === void 0) { delayTime = 0; }
                return __awaiter(this, void 0, void 0, function () {
                    var adHandle, loadResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.error("[IOSPlatform.cacheAd] \u7F13\u5B58\u5E7F\u544A\u4FE1\u606F key:" + key + " info:" + (this.cacheAdHandleDict[key] ? this.cacheAdHandleDict[key].length : 0));
                                if (classPath == null) {
                                    console.error("[IOSPlatform.cacheAd] \u7F13\u5B58\u5E7F\u544A\u5931\u8D25 classPath:" + classPath + " \u4E0D\u5B58\u5728");
                                    return [2 /*return*/, { result: false, eventKey: xgame.AdEventKey.noInit }];
                                }
                                if (!delayTime) return [3 /*break*/, 2];
                                return [4 /*yield*/, xgame.wait(delayTime * 1000)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                this.cacheAdHandleDict[key] = this.cacheAdHandleDict[key] || [];
                                if (this.cacheAdHandleDict[key].length > 0)
                                    return [2 /*return*/, { result: true }];
                                adHandle = new xgame.RewardedVideoHandle(key, classPath);
                                this.adLoadCall && this.adLoadCall(key);
                                return [4 /*yield*/, adHandle.load()];
                            case 3:
                                loadResult = _a.sent();
                                this.adLoadCallResult && this.adLoadCallResult(key, loadResult.result, loadResult.code, loadResult.msg);
                                if (loadResult.result) {
                                    if (this.cacheAdHandleDict[key] == null)
                                        this.cacheAdHandleDict[key] = [];
                                    this.cacheAdHandleDict[key].push(adHandle);
                                }
                                console.error("[IOSPlatform.cacheAd] \u7F13\u5B58\u7ED3\u679C:" + JSON.stringify(loadResult));
                                return [2 /*return*/, loadResult];
                        }
                    });
                });
            };
            NativePlatform.prototype.showAd = function (key, classPath, ritSceneDescribe) {
                if (ritSceneDescribe === void 0) { ritSceneDescribe = ""; }
                return __awaiter(this, void 0, void 0, function () {
                    var result, index, loadResult, adHandle;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                xgame.openLog && console.log("[IOSPlatform.showAD] \u6784\u5EFA\u5E7F\u544A\u5904\u7406\u5BF9\u8C61... " + key);
                                result = { result: false, eventKey: xgame.AdEventKey.noInit };
                                if (!this.isCacheing) return [3 /*break*/, 5];
                                index = 0;
                                _a.label = 1;
                            case 1:
                                if (!(index < 100)) return [3 /*break*/, 4];
                                console.error("[IOSPlatform.showAd] \u5F00\u59CB\u64AD\u653E\uFF0C\u53D1\u73B0\u5728\u7F13\u5B58\u4E2D... " + index);
                                return [4 /*yield*/, xgame.wait(50)];
                            case 2:
                                _a.sent();
                                if (!this.isCacheing)
                                    return [3 /*break*/, 4];
                                _a.label = 3;
                            case 3:
                                index++;
                                return [3 /*break*/, 1];
                            case 4: return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, this.addADKey(key, classPath)];
                            case 6:
                                result = _a.sent();
                                console.error("[IOSPlatform.showAd] addADKey \u7ED3\u679C:" + JSON.stringify(result));
                                _a.label = 7;
                            case 7:
                                //缓存视频
                                console.error("[IOSPlatform.showAd] \u5F00\u59CB\u64AD\u653E\uFF0C\u7F13\u5B58\u6570\u636E\u91CF");
                                loadResult = this.cacheAdHandleDict[key].length > 0;
                                console.error("[IOSPlatform.showAd] \u5F00\u59CB\u64AD\u653E\uFF0C\u7F13\u5B58\u6570\u636E\u91CF " + this.cacheAdHandleDict[key].length);
                                if (!loadResult) return [3 /*break*/, 9];
                                adHandle = this.cacheAdHandleDict[key].pop();
                                xgame.openLog && ("[IOSPlatform.showAD] \u5F00\u59CB\u64AD\u653E...");
                                return [4 /*yield*/, adHandle.play(ritSceneDescribe)];
                            case 8:
                                result = _a.sent();
                                this.addADKey(key, classPath, 1);
                                xgame.openLog && console.log("[IOSPlatform.showAD] \u64AD\u653E\u5B8C\u6210... " + JSON.stringify(result));
                                _a.label = 9;
                            case 9: return [2 /*return*/, result];
                        }
                    });
                });
            };
            return NativePlatform;
        }(platform.BasePlatform));
        platform.NativePlatform = NativePlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
///<reference path="./BasePlatform.ts" />
///<reference path="./NativePlatform.ts" />
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        var AndroidPlatform = /** @class */ (function (_super) {
            __extends(AndroidPlatform, _super);
            function AndroidPlatform() {
                return _super.call(this) || this;
            }
            /** 支付接口 */
            AndroidPlatform.prototype.pay = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        console.log("[AndroidPlatform.pay] \u53D1\u8D77\u652F\u4ED8 id:" + id);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var serialID = xgame.MathTools.getHashCode();
                                var eventKey = "" + xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyPay] + serialID;
                                var loadResultFunc = function (data) {
                                    console.log("[AndroidPlatform.pay] \u6536\u5230 native \u63A5\u53E3 \u56DE\u8C03 data:" + JSON.stringify(data));
                                    xgame.getXGame().platform.off(eventKey, loadResultFunc, _this);
                                    resolve({ code: parseInt(data.errorCode), errMsg: data.errorMsg });
                                };
                                xgame.getXGame().platform.on(eventKey, loadResultFunc, _this);
                                console.log("[AndroidPlatform.pay] \u8C03\u7528native\u652F\u4ED8\u63A5\u53E3...");
                                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/GooglePlaySDK", "startGooglePlayPay", "(Ljava/lang/String;Ljava/lang/String;)V", serialID.toString(), id);
                            })];
                    });
                });
            };
            return AndroidPlatform;
        }(platform.NativePlatform));
        platform.AndroidPlatform = AndroidPlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
///<reference path="./BasePlatform.ts" />
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        var DebugPlatform = /** @class */ (function (_super) {
            __extends(DebugPlatform, _super);
            function DebugPlatform() {
                var _this = _super.call(this) || this;
                xgame.WxAdCtrl.isLoad = true;
                return _this;
            }
            DebugPlatform.prototype.getSystemInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            DebugPlatform.prototype.getNetworkType = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            DebugPlatform.prototype.share = function (targetObj) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, true];
                    });
                });
            };
            DebugPlatform.prototype.showGameClubButton = function (isShow) { };
            return DebugPlatform;
        }(platform.BasePlatform));
        platform.DebugPlatform = DebugPlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
    需要与JS, IOS，Android端同步
    */
    var EnumJSEventKey;
    (function (EnumJSEventKey) {
        /**
         广告事件
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyAd"] = 0] = "EnumJSEventKeyAd";
        /**
         * 用户登录事件: {"serialID": "guestLogin", "state": 1}
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyLogin"] = 1] = "EnumJSEventKeyLogin";
        /**
         * 推送授权事件: {"serialID": "push", "state": true}
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyPush"] = 2] = "EnumJSEventKeyPush";
        /**
         * 新加查询商品事件
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyQuery"] = 3] = "EnumJSEventKeyQuery";
        /**
         * 新加支付事件
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyPay"] = 4] = "EnumJSEventKeyPay";
        /**
         * 订单查询
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyQueryPurchases"] = 5] = "EnumJSEventKeyQueryPurchases";
        /**
         * 订单完成
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyConsumePurchases"] = 6] = "EnumJSEventKeyConsumePurchases";
        /**
         * 恢复购买
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyRestore"] = 7] = "EnumJSEventKeyRestore";
        /**
         * taptap广告
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyTapTap"] = 8] = "EnumJSEventKeyTapTap";
        /**
         * 实名认证
         */
        EnumJSEventKey[EnumJSEventKey["EnumJSEventKeyRealName"] = 9] = "EnumJSEventKeyRealName";
    })(EnumJSEventKey = xgame.EnumJSEventKey || (xgame.EnumJSEventKey = {}));
})(xgame || (xgame = {}));
///<reference path="./BasePlatform.ts" />
///<reference path="./NativePlatform.ts" />
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        var IOSPlatform = /** @class */ (function (_super) {
            __extends(IOSPlatform, _super);
            function IOSPlatform() {
                return _super.call(this) || this;
            }
            /** 支付接口 */
            IOSPlatform.prototype.pay = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        console.log("[IOSPlatform.pay] \u53D1\u8D77\u652F\u4ED8 id:" + id);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var serialID = xgame.MathTools.getHashCode();
                                var eventKey = "" + xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyPay] + serialID;
                                var loadResultFunc = function (data) {
                                    console.log("[IOSPlatform.pay] \u6536\u5230 native \u63A5\u53E3 \u56DE\u8C03 data:" + JSON.stringify(data));
                                    xgame.getXGame().platform.off(eventKey, loadResultFunc, _this);
                                    if (data.state == xgame.CSJADState.paySuccess) {
                                        resolve({ code: 0 });
                                    }
                                    else {
                                        resolve({ code: data.state, errMsg: data.errorMsg });
                                    }
                                };
                                xgame.getXGame().platform.on(eventKey, loadResultFunc, _this);
                                console.log("[IOSPlatform.pay] \u8C03\u7528native\u652F\u4ED8\u63A5\u53E3...");
                                jsb.reflection.callStaticMethod("PayStoreObserver", "appStorePay:product:", serialID.toString(), id);
                            })];
                    });
                });
            };
            return IOSPlatform;
        }(platform.NativePlatform));
        platform.IOSPlatform = IOSPlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * 数据管理器
         */
        var PlatformMgr = /** @class */ (function (_super) {
            __extends(PlatformMgr, _super);
            function PlatformMgr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**分享信息 */
                _this._shareInfo = {};
                /**广告key */
                _this._adVideoKey = null;
                _this._platform = null;
                return _this;
            }
            Object.defineProperty(PlatformMgr.prototype, "videoKey", {
                set: function (key) {
                    this._adVideoKey = key;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PlatformMgr.prototype, "platformObj", {
                get: function () {
                    return this._platform;
                },
                enumerable: false,
                configurable: true
            });
            /**设置一个分享配置 */
            PlatformMgr.prototype.setShareInfo = function (key, title, imgUrl) {
                this._shareInfo[key] = { title: title, imgUrl: imgUrl };
            };
            PlatformMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[PlatformMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                            this._platform = new xgame.platform.WxgamePlatform();
                            xgame.openLog && console.log("[PlatformMgr init] : platform:" + '微信小游戏');
                        }
                        else if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
                            this._platform = new xgame.platform.IOSPlatform();
                            xgame.openLog && console.log("[PlatformMgr init] : platform:" + 'IPHONE');
                        }
                        else if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative) {
                            this._platform = new xgame.platform.AndroidPlatform();
                            xgame.openLog && console.log("[PlatformMgr init] : platform:" + 'Android');
                        }
                        else {
                            this._platform = new xgame.platform.DebugPlatform();
                            xgame.openLog && console.log("[PlatformMgr init] : platform:" + '开发平台');
                        }
                        this.reset();
                        return [2 /*return*/, this.isFinish = true];
                    });
                });
            };
            PlatformMgr.prototype.start = function () {
            };
            // ====================== 功能区 =======================
            /**
             * 设置广告key
             * @param key 广告key
             */
            PlatformMgr.prototype.setADKey = function (key, classPath) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._platform.addADKey(key, classPath)];
                    });
                });
            };
            /**
             * 获取用户信息（微信平台坐标需要按照微信平台的坐标系设置，需转坐标系后传入值）
             * @param x 世界坐标系X点
             * @param y 世界坐标系Y点
             * @param w 宽
             * @param h 高
             */
            PlatformMgr.prototype.showGetUserInfoBtn = function (x, y, w, h, call, testRoundColor) {
                return this._platform.showGetUserInfoBtn(x, y, w, h, call, testRoundColor);
            };
            //分享
            PlatformMgr.prototype.share = function (targetObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var preTime, result, endTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                preTime = Date.now();
                                return [4 /*yield*/, this._platform.share(targetObj)];
                            case 1:
                                result = _a.sent();
                                endTime = Date.now();
                                xgame.openLog && console.error("[PlatformMgr.share] : preTime\uFF1A" + preTime + " endTime:" + endTime + " - " + (endTime - preTime) + "ms");
                                if (cc.sys.platform == cc.sys.WECHAT_GAME && endTime - preTime >= 2000)
                                    return [2 /*return*/, true];
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            //分享设置
            PlatformMgr.prototype.setShareAppMessage = function (configObj) {
                this._platform.setShareAppMessage(configObj);
            };
            //显示广告
            PlatformMgr.prototype.showAd = function (key, classPath, ritSceneDescribe) {
                if (ritSceneDescribe === void 0) { ritSceneDescribe = ""; }
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._platform.showAd(key, classPath, ritSceneDescribe)];
                    });
                });
            };
            //显示Banner广告
            PlatformMgr.prototype.showBanner = function (key, style, adIntervals) {
                return this._platform.showBanner(key, style, adIntervals);
            };
            // 显示插屏广告
            PlatformMgr.prototype.showInterstitial = function (key) {
                return this._platform.showInterstitial(key);
            };
            //显示广告
            PlatformMgr.prototype.hideBanner = function () {
                return this._platform.hideBanner();
            };
            // 短震动
            PlatformMgr.prototype.vibrateShort = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._platform.vibrateShort()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            // 长震动
            PlatformMgr.prototype.vibrateLong = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._platform.vibrateLong()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            /** 计费相关 */
            //显示广告
            PlatformMgr.prototype.pay = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._platform.pay(id)];
                    });
                });
            };
            /**
             * 发送GET URL请求
             * @param targetUrl 目标地址
             * @param sendData 发送数据
             */
            PlatformMgr.prototype.getURL = function (targetUrl, sendData) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._platform.getURL(targetUrl, sendData)];
                    });
                });
            };
            /**
             * 发送POST URL请求
             * @param targetUrl 目标地址
             * @param sendData 发送数据
             */
            PlatformMgr.prototype.postURL = function (targetUrl, sendData, headers) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._platform.postURL(targetUrl, sendData, headers)];
                    });
                });
            };
            /**
             * 发送事件到开放域
             * @param showType 事件类型
             * @param data 携带数据
             */
            PlatformMgr.prototype.postOpenContentMsg = function (showType, data) {
                var openData = { isGameDefined: true, showType: showType, expData: data };
                this._platform.postMessage(openData);
            };
            /**
             * 显示模块信息
             * @param title 显示标题
             * @param content 显示上下文
             */
            PlatformMgr.prototype.showModel = function (title, content, cancelText, confirmText) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._platform.showModel(title, content, cancelText, confirmText)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            PlatformMgr.prototype.reset = function () {
                this._shareInfo = {};
            };
            /**
             * 接受本地发来的消息（）
             * @param key
             * @param data
             */
            PlatformMgr.prototype.onRecvNativeMsg = function (key, data) {
                console.log("onRecvNativeMsg");
                console.log("\u6536\u5230native\u7AEF\u6D88\u606F KEY:" + xgame.EnumJSEventKey[key] + " data:" + JSON.stringify(data));
                console.log("\u53D1\u9001\u4E8B\u4EF6KEY: KEY:" + xgame.EnumJSEventKey[key] + data.serialID);
                this.emit("" + xgame.EnumJSEventKey[key] + data.serialID, data);
            };
            PlatformMgr.prototype.onUpdate = function (dt) {
            };
            PlatformMgr.prototype.dispose = function () {
                this.reset();
            };
            /**
             *  获取版本号
             */
            PlatformMgr.getNativeVersion = function () {
                var version = xgame.config.NATIVE_VERSION;
                if (cc.sys.isNative) {
                    xgame.openLog && console.log("[registeredEvent] \u83B7\u53D6\u7248\u672C\u53F7... native:" + cc.sys.isNative + " os:" + cc.sys.os);
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        version = jsb.reflection.callStaticMethod("BISDK", "getVersion");
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        version = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getVersion", "()Ljava/lang/String;");
                    }
                }
                xgame.openLog && console.log("\u83B7\u53D6\u7248\u672C\u53F7:" + version);
                return version;
            };
            /**
            *  获取包名
            */
            PlatformMgr.getNativePackageName = function () {
                var packageName = xgame.config.NATIVE_VERSION;
                if (cc.sys.isNative) {
                    xgame.openLog && console.log("[registeredEvent] \u83B7\u53D6\u5305\u540D... native:" + cc.sys.isNative + " os:" + cc.sys.os);
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        packageName = jsb.reflection.callStaticMethod("BISDK", "getPackageName");
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        packageName = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getPackageName", "()Ljava/lang/String;");
                    }
                }
                xgame.openLog && console.log("\u83B7\u53D6\u5305\u540D:" + packageName);
                return packageName;
            };
            /**
             *  获取版本号
             */
            PlatformMgr.getDeviceSerialID = function () {
                var deviceSerialID = xgame.MathTools.getUuid();
                try {
                    if (cc.sys.isNative) {
                        xgame.openLog && console.log("[registeredEvent] \u767B\u5F55\u6E38\u620F\u5F00\u59CB...");
                        if (cc.sys.os == cc.sys.OS_IOS) {
                            deviceSerialID = jsb.reflection.callStaticMethod("BISDK", "getDeviceSerialID");
                        }
                        else if (cc.sys.os == cc.sys.OS_ANDROID) {
                            deviceSerialID = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getDeviceSerialID", "()Ljava/lang/String;");
                        }
                    }
                }
                catch (error) {
                }
                xgame.openLog && console.log("\u83B7\u53D6\u8BBE\u5907\u552F\u4E00ID:" + deviceSerialID);
                return deviceSerialID;
            };
            /**
             *  比较版本号
             *  如果传入版本号大于(>)当前版本号 返回 1
             * 如果传入版本号小于(<)当前版本号 返回 -1
             * 如果传入版本号等于(=)当前版本号 返回 0
             */
            PlatformMgr.getCompareNativeVersion = function (targetVersion) {
                var curVersion = this.getNativeVersion();
                xgame.openLog && console.log("[PlatformMgr.getCompareVersion] \u7248\u672C\u6BD4\u8F83 \u7248\u672C A : " + targetVersion + " \u7248\u672C B : " + curVersion);
                var vA = targetVersion.split('.');
                var vB = curVersion.split('.');
                for (var i = 0; i < vA.length; ++i) {
                    var a = parseInt(vA[i]) || 0;
                    var b = parseInt(vB[i]) || 0;
                    if (a !== b) {
                        return a - b;
                    }
                }
                return (vB.length > vA.length) ? -1 : 0;
            };
            /**
             * 获取客户端用户信息，格式如下：
             * {
                autoLoginToken: "g|KCrjGa9CBCwPfJfpJCLeXLpZrhYfPF"
                avator: ""
                isAdult: false
                isRealNameVerified: false
                lastOpenID: ""
                loginType: 1
                mobile: ""
                nickName: "JCrjGa9CBCh4jJKC"
                openID: "JCrjGa9CBCh4jJKC"
             * }
             */
            PlatformMgr.prototype.getNativeUser = function () {
                var userInfoStr = "";
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        userInfoStr = jsb.reflection.callStaticMethod("LoginHandle", "currentUser");
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        userInfoStr = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/sdk/login/LoginHandle', "currentUser", "()Ljava/lang/String;");
                    }
                }
                return userInfoStr ? JSON.parse(userInfoStr) : null;
            };
            /**
             * 客户端登录，支持游客静默登录或者用户信息登录
             * {autoLoginToken: "d|JCrTEcrV8CJhncf7XvTat8er7Pm9T7", loginType: 3, openID: "JLJEncAe6CtY76Py", nickName: "天龙第一部", lastOpenID: ""}
             * @param type userLogin / guestLogin
             */
            PlatformMgr.prototype.nativeLogin = function (type) {
                var This = this;
                return new Promise(function (resolve) {
                    var evtKey = "" + xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyLogin] + type;
                    var callback = function (result) {
                        This.off(evtKey, callback);
                        resolve(result);
                    };
                    This.on(evtKey, callback);
                    if (cc.sys.isNative) {
                        if (cc.sys.os == cc.sys.OS_IOS) {
                            jsb.reflection.callStaticMethod("LoginHandle", type);
                        }
                        else if (cc.sys.os == cc.sys.OS_ANDROID) {
                            jsb.reflection.callStaticMethod('org/cocos2dx/javascript/sdk/login/LoginHandle', type, "()V");
                        }
                    }
                    else {
                        callback({ state: 1 });
                    }
                });
            };
            /**
             * 客户端静默登录（游客登录）
             */
            PlatformMgr.prototype.guestLogin = function () {
                return this.nativeLogin('guestLogin');
            };
            /**
             * 登录
             */
            PlatformMgr.prototype.userLogin = function () {
                return this.nativeLogin('userLogin');
            };
            /**
             * 客户端用户登录（其实是游客信息绑定）
             */
            PlatformMgr.prototype.bindUser = function () {
                return this.nativeLogin('bindUser');
            };
            /**
             * 客户端切换账号
             */
            PlatformMgr.prototype.switchUser = function () {
                return this.nativeLogin('switchUser');
            };
            /**
             * 客户端用户登出
             */
            PlatformMgr.prototype.logOutAccount = function () {
                return this.nativeLogin('logOutAccount');
            };
            /**
             * 调用客户端实名认证
             */
            PlatformMgr.prototype.realNameVerify = function () {
                return this.nativeLogin('realNameVerify');
            };
            /**
             * 调用客户端评分弹窗，仅支持ios
             */
            PlatformMgr.prototype.requestReview = function () {
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        jsb.reflection.callStaticMethod("BISDK", "requestReview");
                    }
                }
            };
            /**
             * 复制内容到剪贴板
             */
            PlatformMgr.prototype.copyToClipboard = function (str) {
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        jsb.reflection.callStaticMethod("JSAdapter", "copyToClipboard:", str);
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/JSAdapter", "copyToClipboard", "(Ljava/lang/String;)V", str);
                    }
                }
                else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    wx.setClipboardData({ data: str, success: function () { wx.hideToast({ success: function () { }, fail: function () { }, complete: function () { } }); }, fail: function () { }, complete: function () { } });
                }
            };
            /**
             * 获取设备did
             */
            PlatformMgr.prototype.getUniqueDid = function (str) {
                var did = "";
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        did = jsb.reflection.callStaticMethod("BISDK", "getUniqueDid");
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        did = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getUniqueDid", "()Ljava/lang/String;");
                    }
                }
                return did;
            };
            /**
             * 计算md5
             */
            PlatformMgr.prototype.md5sum = function (str) {
                var sum = "";
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        sum = jsb.reflection.callStaticMethod("JSAdapter", "md5Sum:", str);
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        sum = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/JSAdapter", "md5Sum", "(Ljava/lang/String;)Ljava/lang/String;", str);
                    }
                }
                return sum;
            };
            /**
             * 计算md5
             */
            PlatformMgr.prototype.genReqHeader = function (uuid, bodySum) {
                var sum = "";
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        sum = jsb.reflection.callStaticMethod("BISDK", "genReqHeader:sig:", uuid, bodySum);
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        sum = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "genReqHeader", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", uuid, bodySum);
                    }
                }
                return sum;
            };
            /**
             * 发送aliyun日志
             */
            PlatformMgr.prototype.sendAliEvent = function (str) {
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        jsb.reflection.callStaticMethod("BISDK", "sendAliEvent:", str);
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "sendAliEvent", "(Ljava/lang/String;)V", str);
                    }
                }
            };
            /**
             * 获取设备名
             */
            PlatformMgr.prototype.getDeivceName = function () {
                var deviceName = "unknow";
                if (cc.sys.isNative) {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        // jsb.reflection.callStaticMethod("BISDK", "sendAliEvent:", str);
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        deviceName = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/DeviceInfoUtils", "getDeviceName", "()Ljava/lang/String;");
                    }
                }
                return deviceName;
            };
            return PlatformMgr;
        }(cc.EventTarget));
        mgr.PlatformMgr = PlatformMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var platform;
    (function (platform) {
        var WxgamePlatform = /** @class */ (function (_super) {
            __extends(WxgamePlatform, _super);
            function WxgamePlatform() {
                var _this = _super.call(this) || this;
                /**平台类型 */
                _this.type = platform.EnumPlatformType.wxgame;
                _this.appID = "wx4a6b3fff438dbec4";
                /**震动阀值 */
                _this.vibrateWaitTime = 50;
                _this.curVibrateTime = 0;
                _this.wxAdCtrl = new xgame.WxAdCtrl();
                _this.wxBannerCtrl = new xgame.WxBannerCtrl();
                _this.wxInterstitialCtrl = new xgame.WxInterstitialCtrl();
                var system = wx.getSystemInfoSync();
                _this.GameClubButton = wx.createGameClubButton({
                    icon: "dark",
                    style: {
                        left: system.windowWidth * 0.03,
                        top: system.windowHeight * 0.88,
                        width: 40,
                        height: 40,
                    },
                    type: "image",
                    text: null,
                    image: null,
                });
                _this.GameClubButton.hide();
                return _this;
            }
            WxgamePlatform.prototype.addADKey = function (key) {
                this.wxAdCtrl.initAd(key);
            };
            WxgamePlatform.prototype.showGameClubButton = function (isShow) {
                if (isShow)
                    this.GameClubButton.show();
                else
                    this.GameClubButton.hide();
            };
            WxgamePlatform.prototype.onSharedFinish = function () {
            };
            /**
             * 设置小程序自带分享功能
             * @param configObj 小程序自带分享功能参数设置
             */
            WxgamePlatform.prototype.setShareAppMessage = function (configObj) {
                //更新群转发为 withShareTicket 模式
                wx.updateShareMenu({
                    withShareTicket: true
                });
                //设定预设按钮回调处理
                var self = this;
                wx.onShareAppMessage(function () {
                    var titleName = configObj.titleName;
                    var imageUrl = configObj.imageUrl;
                    //修正为远程路径
                    self.onSharedFinish();
                    var queryStr = undefined;
                    if (configObj.query)
                        for (var _i = 0, _a = configObj.query; _i < _a.length; _i++) {
                            var queryCfg = _a[_i];
                            var tmpQuery = queryCfg.key + "=" + queryCfg.value;
                            if (queryStr == undefined) {
                                queryStr = tmpQuery;
                            }
                            else {
                                queryStr = queryStr + '&' + tmpQuery;
                            }
                        }
                    return {
                        title: titleName,
                        imageUrl: imageUrl,
                        // query: `fromUserID=${"test"}`,
                        query: queryStr
                    };
                });
                wx.showShareMenu(({
                    withShareTicket: true,
                    success: function (res) {
                        xgame.openLog && console.log("按钮显示成功:" + JSON.stringify(res));
                        //TODO: 补充写上右上角转发内容
                    }, fail: function (res) {
                        xgame.openLog && console.log("按钮显示失败:" + JSON.stringify(res));
                        //TODO: 补充写上右上角转发内容
                    }, complete: function (res) {
                    }
                }));
            };
            WxgamePlatform.prototype.login = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.login({
                                    success: function (res) {
                                        xgame.isDebug && console.log("[login success] - " + JSON.stringify(res));
                                        resolve(res);
                                    },
                                    fail: function (res) {
                                        xgame.isDebug && console.log("[login fail] - " + JSON.stringify(res));
                                        resolve(res);
                                    },
                                    complete: function (res) {
                                        xgame.isDebug && console.log("[login complete] - " + JSON.stringify(res));
                                    }
                                });
                            })];
                    });
                });
            };
            WxgamePlatform.prototype.postURL = function (targetUrl, sendData, headers) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: targetUrl,
                                    data: sendData,
                                    method: 'POST',
                                    dataType: 'json',
                                    header: __assign({ "Content-type": "application/x-www-form-urlencoded" }, headers),
                                    success: function (res, status) {
                                        resolve(res.data);
                                    },
                                    fail: function (res) {
                                        xgame.openLog && console.error("error res:" + JSON.stringify(res));
                                        reject(res);
                                    },
                                    complete: function (res) { }
                                });
                            })];
                    });
                });
            };
            WxgamePlatform.prototype.getURL = function (targetUrl, keyValue) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: targetUrl + '?' + xgame.transRequestParamWithEncode(keyValue),
                                    method: 'GET',
                                    dataType: 'json',
                                    header: {
                                        "Content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function (res, status) {
                                        resolve(res.data);
                                    },
                                    fail: function (res) {
                                        xgame.openLog && console.error("error res:" + JSON.stringify(res));
                                        reject(res);
                                    },
                                    complete: function (res) { }
                                });
                            })];
                    });
                });
            };
            WxgamePlatform.prototype.auth = function (code) {
                return new Promise(function (resolve, reject) {
                    wx.request;
                });
            };
            //分享处理
            WxgamePlatform.prototype.share = function (targetObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var tmpDate = Date.now();
                                var callBack = function () {
                                    _this.removeOnShow(callBack);
                                    xgame.openLog && console.error("[\u5206\u4EAB\u65F6\u673A] - \u5DF2\u7ECF\u4ECE\u540E\u53F0\u56DE\u6765 " + (Date.now() - tmpDate));
                                    resolve(true);
                                };
                                xgame.openLog && console.error("[\u5206\u4EAB\u65F6\u673A] - \u6DFB\u52A0\u7B49\u5F85\u540E\u53F0\u56DE\u6765\u7684\u56DE\u8C03");
                                _this.addOnShow(callBack);
                                var queryStr = undefined;
                                if (targetObj.query)
                                    for (var index = 0; index < targetObj.query.length; index++) {
                                        var queryCfg = targetObj.query[index];
                                        var tmpQuery = queryCfg.key + "=" + queryCfg.value;
                                        if (index == 0) {
                                            queryStr = tmpQuery;
                                        }
                                        else {
                                            queryStr = queryStr + '&' + tmpQuery;
                                        }
                                    }
                                xgame.openLog && console.log("[WxgamePlatform.share] \u5206\u4EAB\u53C2\u6570\u4FE1\u606F:" + queryStr);
                                wx.shareAppMessage({
                                    query: queryStr, title: targetObj.title, imageUrl: targetObj.imageUrl
                                });
                                xgame.openLog && console.log("[share] - \u8C03\u7528\u5B8C\u6210");
                            })];
                    });
                });
            };
            //显示视频广告
            WxgamePlatform.prototype.showAd = function (key, className) {
                return __awaiter(this, void 0, void 0, function () {
                    var audioHashCode, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                audioHashCode = xgame.getXGame().audio.pause();
                                return [4 /*yield*/, this.wxAdCtrl.show(key)];
                            case 1:
                                result = _a.sent();
                                xgame.getXGame().audio.resume(audioHashCode);
                                return [2 /*return*/, { result: result == xgame.AdEventKey.begin, eventKey: result }];
                        }
                    });
                });
            };
            //显示视频广告
            WxgamePlatform.prototype.showBanner = function (key, style, adIntervals) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.wxBannerCtrl.showBannerAd(key, style, adIntervals)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            WxgamePlatform.prototype.hideBanner = function () {
                this.wxBannerCtrl.hideBannerAd();
            };
            // 显示插屏广告
            WxgamePlatform.prototype.showInterstitial = function (key) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.wxInterstitialCtrl.showInterstitialAd(key)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            WxgamePlatform.prototype.exit = function () {
                wx.exitMiniProgram({
                    success: function (res) {
                        xgame.openLog && console.log("[exitMiniProgram] - \u9000\u51FA\u6E38\u620F\u6210\u529F " + JSON.stringify(res));
                    },
                    fail: function (res) {
                        xgame.openLog && console.log("[exitMiniProgram] - \u9000\u51FA\u6E38\u620F\u5931\u8D25 " + JSON.stringify(res));
                    }, complete: function (res) {
                        xgame.openLog && console.log("[exitMiniProgram] - \u9000\u51FA\u6E38\u620F\u5B8C\u6210 " + JSON.stringify(res));
                    }
                });
            };
            WxgamePlatform.prototype.showGetUserInfoBtn = function (x, y, w, h, call, testRoundColor) {
                if (testRoundColor === void 0) { testRoundColor = true; }
                xgame.openLog && console.log("[\u767B\u9646] - \u5F00\u59CB\u83B7\u53D6\u7528\u6237\u6570\u636E");
                /**转换微信坐标1 */
                var frameSize = cc.view.getFrameSize();
                var winSize = cc.winSize;
                var left = (x - w / 2) / winSize.width * frameSize.width;
                var top = (cc.winSize.height - y - h / 2) / winSize.height * frameSize.height;
                var system = wx.getSystemInfoSync();
                xgame.openLog && console.log("[\u767B\u9646 - \u7CFB\u7EDF\u4FE1\u606F] - " + system);
                var wxButton = wx.createUserInfoButton({
                    type: 'text',
                    text: '',
                    withCredentials: true,
                    lang: "zh_CN",
                    style: {
                        left: left || 0,
                        top: top || 0,
                        width: w / 2 || system.windowWidth - 10,
                        height: h / 2 || system.windowHeight - 10,
                        backgroundColor: testRoundColor ? '#000000' : 'transparent',
                    }
                });
                wxButton.show();
                wxButton.onTap(function (res) {
                    xgame.openLog && console.log("[点击获取用户信息按钮] - " + JSON.stringify(res));
                    var userInfo = res.userInfo;
                    // let nickName = userInfo.nickName
                    // let avatarUrl = userInfo.avatarUrl
                    // let gender = userInfo.gender //性别 0：未知、1：男、2：女
                    // let province = userInfo.province
                    // let city = userInfo.city
                    // let country = userInfo.country
                    xgame.openLog && console.log("loginInfo:" + JSON.stringify(userInfo));
                    call && call(userInfo);
                });
                return wxButton;
            };
            WxgamePlatform.prototype.hideGetUserInfoBtn = function () {
            };
            WxgamePlatform.prototype.getSystemInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.getSystemInfo({
                                    success: function (res) {
                                        var sysInfo = res;
                                        resolve(sysInfo);
                                    },
                                    fail: function (res) {
                                        resolve(res);
                                    },
                                    complete: function (res) {
                                        resolve(res);
                                    }
                                });
                            })];
                    });
                });
            };
            WxgamePlatform.prototype.getNetworkType = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.getNetworkType({
                                    success: function (res) {
                                        resolve(res.networkType);
                                    },
                                    fail: function (res) {
                                        resolve(res);
                                    },
                                    complete: function (res) {
                                        resolve(res);
                                    }
                                });
                            })];
                    });
                });
            };
            WxgamePlatform.prototype.addOnHide = function (callback) {
                wx.onHide(callback);
            };
            WxgamePlatform.prototype.addOnShow = function (callback) {
                wx.onShow(callback);
            };
            WxgamePlatform.prototype.removeOnHide = function (callback) {
                wx.offHide(callback);
            };
            WxgamePlatform.prototype.removeOnShow = function (callback) {
                wx.offShow(callback);
            };
            WxgamePlatform.prototype.onAudioInterruptionEnd = function (callback) {
                wx.onAudioInterruptionEnd(callback);
            };
            WxgamePlatform.prototype.onAudioInterruptionBegin = function (callback) {
                wx.onAudioInterruptionBegin(callback);
            };
            WxgamePlatform.prototype.removeUserDir = function () {
            };
            WxgamePlatform.prototype.postMessage = function (data) {
                var openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage(data);
            };
            /**
             * 显示确认取消弹出窗口
             * 回调内容 {"errMsg":"showModal:ok","cancel":false,"confirm":true}
             */
            WxgamePlatform.prototype.showModel = function (title, content, cancelText, confirmText) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                wx.showModal({
                                    title: title,
                                    content: content,
                                    cancelText: cancelText,
                                    confirmText: confirmText,
                                    complete: function (res) {
                                        resolve(res.errMsg == "showModal:ok" && res.confirm);
                                    },
                                });
                            })];
                    });
                });
            };
            ;
            // 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
            WxgamePlatform.prototype.vibrateShort = function () {
                var nowTime = Date.now();
                if (nowTime - this.curVibrateTime < this.vibrateWaitTime) {
                    return;
                }
                this.curVibrateTime = nowTime;
                return new Promise(function (resolve, reject) {
                    wx.vibrateShort({
                        fail: function (res) {
                            resolve(false);
                        },
                        complete: function (res) {
                            resolve(true);
                        }
                    });
                });
            };
            // 使手机发生较长时间的振动（400 ms)
            WxgamePlatform.prototype.vibrateLong = function () {
                var nowTime = Date.now();
                if (nowTime - this.curVibrateTime < this.vibrateWaitTime) {
                    return;
                }
                this.curVibrateTime = nowTime;
                return new Promise(function (resolve, reject) {
                    wx.vibrateLong({
                        fail: function (res) {
                            resolve(false);
                        },
                        complete: function (res) {
                            resolve(true);
                        }
                    });
                });
            };
            return WxgamePlatform;
        }(platform.BasePlatform));
        platform.WxgamePlatform = WxgamePlatform;
    })(platform = xgame.platform || (xgame.platform = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 数据状态
     */
    var CSJCacheState;
    (function (CSJCacheState) {
        CSJCacheState[CSJCacheState["none"] = 0] = "none";
        CSJCacheState[CSJCacheState["loading"] = 1] = "loading";
        CSJCacheState[CSJCacheState["ready"] = 2] = "ready";
        CSJCacheState[CSJCacheState["playing"] = 3] = "playing";
        CSJCacheState[CSJCacheState["finish"] = 4] = "finish";
    })(CSJCacheState = xgame.CSJCacheState || (xgame.CSJCacheState = {}));
    /**
     * 广告处理对象
     */
    var RewardedVideoHandle = /** @class */ (function () {
        function RewardedVideoHandle(sortID, classPath) {
            /**唯一码 */
            this.serialID = xgame.MathTools.getHashCode().toString();
            /** 对象状态 */
            this.state = CSJCacheState.loading;
            this._classPath = "";
            this._sortID = sortID;
            this.state = CSJCacheState.none;
            this._classPath = classPath;
            xgame.openLog && ("[RewardedVideoHandle] \u751F\u6210\u5E7F\u544A\u5904\u7406\u5BF9\u8C61: " + this._sortID + " " + this._classPath);
        }
        /**
         * 加载广告
         */
        RewardedVideoHandle.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var loadResult, self;
                var _this = this;
                return __generator(this, function (_a) {
                    loadResult = { result: false };
                    if (this.state != CSJCacheState.none) {
                        xgame.openLog && console.log("[RewardedVideoHandle.load] \u89C6\u9891\u5DF2\u7F13\u5B58\uFF0C\u65E0\u9700\u518D\u6B21\u7F13\u5B58 " + this.serialID);
                        return [2 /*return*/, loadResult];
                    }
                    self = this;
                    this.state = CSJCacheState.loading;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            /** 结果回调 */
                            var over = function (result) {
                                xgame.getXGame().platform.off(_this.getEventKey(), loadResultFunc, _this);
                                _this.state = CSJCacheState.ready;
                                loadResult = result;
                                resolve(loadResult);
                            };
                            /** 加载回调 */
                            var loadResultFunc = function (data) {
                                //处理加载结果
                                xgame.openLog && console.log("[CSJCacheInfo.load] \u5904\u7406\u6536\u5230\u4E8B\u4EF6 serialID:" + data.serialID + " data:" + JSON.stringify(data));
                                if (data.state == xgame.CSJADState.loadSucess) {
                                    over({ result: true, code: data.errorCode, msg: data.errorMsg });
                                }
                                else if (data.state == xgame.CSJADState.loadFail || data.state == xgame.CSJADState.adError) {
                                    if (data.state == xgame.CSJADState.adError) {
                                        var evt = { eventKey: "ad", adID: self._sortID, code: data.errorCode, msg: data.errorMsg };
                                        xgame.getXGame().emit(xgame.EnumFrameworkEventKey.xgame_error, evt);
                                        loadResult.code = data.errorCode;
                                        loadResult.msg = data.errorMsg;
                                    }
                                    over({ result: false, code: data.errorCode, msg: data.errorMsg });
                                }
                            };
                            xgame.openLog && console.log("[RewardedVideoHandle.load] \u63A5\u53D7\u4E8B\u4EF6KEY:" + _this.getEventKey());
                            xgame.getXGame().platform.on(_this.getEventKey(), loadResultFunc, _this);
                            console.log("[IOSPlatform.addADKey] \u7F13\u5B58\u5E7F\u544A\u4FE1\u606F classPath:" + _this._classPath);
                            //开始加载
                            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                                jsb.reflection.callStaticMethod(_this._classPath, "createAndLoadAD:userID:sortID:", _this.serialID, "noUserID", _this._sortID.toString());
                            else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME) {
                                jsb.reflection.callStaticMethod(_this._classPath, "loadRewardVideo", "(Ljava/lang/String;Ljava/lang/String;)V", _this.serialID, _this._sortID.toString());
                            }
                        })];
                });
            });
        };
        RewardedVideoHandle.prototype.play = function (ritSceneDescribe) {
            if (ritSceneDescribe === void 0) { ritSceneDescribe = ""; }
            return __awaiter(this, void 0, void 0, function () {
                var self, closeMusic, closeEffect;
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.state != CSJCacheState.ready) {
                        xgame.openLog && console.log("[RewardedVideoHandle.play] \u89C6\u9891\u5728\u64AD\u653E\u4E2D\uFF0C\u65E0\u9700\u7EE7\u7EED\u64AD\u653E " + this.serialID);
                        return [2 /*return*/, { result: false, eventKey: xgame.AdEventKey.open }];
                    }
                    self = this;
                    closeMusic = xgame.getXGame().audio.musicOpen;
                    if (closeMusic)
                        xgame.getXGame().audio.musicOpen = false;
                    closeEffect = xgame.getXGame().audio.musicEffecOpen;
                    if (closeEffect)
                        xgame.getXGame().audio.musicEffecOpen = false;
                    this.state = CSJCacheState.playing;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            /** 结果回调 */
                            var over = function (result) {
                                xgame.getXGame().platform.off(_this.getEventKey(), loadResultFunc, _this);
                                _this.state = CSJCacheState.finish;
                                if (closeMusic)
                                    xgame.getXGame().audio.musicOpen = true;
                                if (closeEffect)
                                    xgame.getXGame().audio.musicEffecOpen = true;
                                if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                                    jsb.reflection.callStaticMethod(_this._classPath, "destoryAD:", _this.serialID);
                                if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME)
                                    jsb.reflection.callStaticMethod(_this._classPath, "destoryRewardVideo", "(Ljava/lang/String;)V", _this.serialID);
                                resolve(result);
                            };
                            /** 加载回调 */
                            var loadResultFunc = function (data) {
                                //处理加载结果
                                xgame.openLog && ("[CSJCacheInfo.play] \u5904\u7406\u6536\u5230\u4E8B\u4EF6 serialID:" + data.serialID + " data:" + JSON.stringify(data));
                                if (data.state == xgame.CSJADState.adError) {
                                    var evt = { eventKey: "ad", adID: self._sortID, code: data.errorCode, msg: data.errorMsg };
                                    xgame.getXGame().emit(xgame.EnumFrameworkEventKey.xgame_error, evt);
                                }
                                else if (data.state == xgame.CSJADState.playFail) {
                                    over({ result: false, eventKey: xgame.AdEventKey.midwayClose, code: data.errorCode, msg: data.errorMsg });
                                }
                                else if (data.state == xgame.CSJADState.playOver) {
                                    over({ result: true, eventKey: xgame.AdEventKey.playOver, code: data.errorCode, msg: data.errorMsg });
                                }
                            };
                            xgame.getXGame().platform.on(_this.getEventKey(), loadResultFunc, _this);
                            //开始加载
                            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                                jsb.reflection.callStaticMethod(_this._classPath, "playAD:ritSceneDescribe:", _this.serialID, ritSceneDescribe);
                            else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME) {
                                jsb.reflection.callStaticMethod(_this._classPath, "playRewardVideo", "(Ljava/lang/String;)V", _this.serialID);
                            }
                        })];
                });
            });
        };
        /**
         * 获取事件KEY
         */
        RewardedVideoHandle.prototype.getEventKey = function () {
            return "" + xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyAd] + this.serialID;
        };
        return RewardedVideoHandle;
    }());
    xgame.RewardedVideoHandle = RewardedVideoHandle;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var CSJADState;
    (function (CSJADState) {
        /** 加载成功 */
        CSJADState[CSJADState["loadSucess"] = 0] = "loadSucess";
        /** 加载失败 */
        CSJADState[CSJADState["loadFail"] = 1] = "loadFail";
        /** 广告播放完成 */
        CSJADState[CSJADState["playOver"] = 2] = "playOver";
        /** 播放失败 */
        CSJADState[CSJADState["playFail"] = 3] = "playFail";
        /** 错误 */
        CSJADState[CSJADState["adError"] = 4] = "adError";
        /**
        * 关闭广告
        */
        CSJADState[CSJADState["adClose"] = 5] = "adClose";
        /**
         * 启动广告
         */
        CSJADState[CSJADState["adStart"] = 6] = "adStart";
        /**
         * 广告结束
         */
        CSJADState[CSJADState["adEnd"] = 7] = "adEnd";
        /**
         * 查询成功
         */
        CSJADState[CSJADState["querySuccess"] = 8] = "querySuccess";
        /**
         * 查询失败
         */
        CSJADState[CSJADState["queryFail"] = 9] = "queryFail";
        /**
         * 支付成功
         */
        CSJADState[CSJADState["paySuccess"] = 10] = "paySuccess";
        /**
         * 支付失败
         */
        CSJADState[CSJADState["payFail"] = 11] = "payFail";
        /**
         * 支付请求失败(没有网络或者网络异常)
         */
        CSJADState[CSJADState["payRequestFail"] = 12] = "payRequestFail";
        /**
         * 消耗成功
         */
        CSJADState[CSJADState["consumeSuccess"] = 13] = "consumeSuccess";
        /**
         * 消耗失败
         */
        CSJADState[CSJADState["consumeFail"] = 14] = "consumeFail";
        /**
         * 查询全部订单信息成功
         */
        CSJADState[CSJADState["queryPurchaseHistorySuccess"] = 15] = "queryPurchaseHistorySuccess";
        /**
         * 查询全部订单信息失败
         */
        CSJADState[CSJADState["queryPurchaseHistoryFail"] = 16] = "queryPurchaseHistoryFail";
        /**
         * 查询交易中订单成功
         */
        CSJADState[CSJADState["queryPurchaseSuccess"] = 17] = "queryPurchaseSuccess";
        /**
         * 查询交易中订单失败
         */
        CSJADState[CSJADState["queryPurchaseFail"] = 18] = "queryPurchaseFail";
        /**
         * 恢复购买完成 - 19
         */
        CSJADState[CSJADState["restoreBuyFinish"] = 19] = "restoreBuyFinish";
    })(CSJADState = xgame.CSJADState || (xgame.CSJADState = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    //播放完成回调
    xgame.sound_complete = "SOUND_COMPLETE";
    var IAudio = /** @class */ (function (_super) {
        __extends(IAudio, _super);
        function IAudio() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IAudio;
    }(cc.EventTarget));
    xgame.IAudio = IAudio;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var WXTools;
    (function (WXTools) {
        //渲染目标类型
        var EnumRenderType;
        (function (EnumRenderType) {
            //普通排行榜
            EnumRenderType[EnumRenderType["normalRank"] = 1] = "normalRank";
            //单曲排行榜
            EnumRenderType[EnumRenderType["singleMusicRank"] = 2] = "singleMusicRank";
            //战斗中超越好友item
            EnumRenderType[EnumRenderType["battlePassItem"] = 3] = "battlePassItem";
        })(EnumRenderType = WXTools.EnumRenderType || (WXTools.EnumRenderType = {}));
        var WxOpenContentCom;
        (function (WxOpenContentCom) {
            WxOpenContentCom[WxOpenContentCom["showRank"] = 0] = "showRank";
            WxOpenContentCom[WxOpenContentCom["nextRank"] = 1] = "nextRank";
            WxOpenContentCom[WxOpenContentCom["lastRank"] = 2] = "lastRank";
            WxOpenContentCom[WxOpenContentCom["beyondFriendRank"] = 3] = "beyondFriendRank";
            WxOpenContentCom[WxOpenContentCom["close"] = 4] = "close";
        })(WxOpenContentCom = WXTools.WxOpenContentCom || (WXTools.WxOpenContentCom = {}));
        var isDebug = false;
        /**检查版本文件信息 */
        function wxDownloadFile(url) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    //xgame.openLog && console.log("[wxDownloadFile] - 版本文件url地址 : " + url);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.downloadFile({
                                url: url,
                                success: function (res) {
                                    if (res.statusCode >= 400) {
                                        try {
                                            WXFS.accessSync(res.tempFilePath);
                                            WXFS.unlinkSync(res.tempFilePath);
                                        }
                                        catch (e) {
                                        }
                                        var err = "[wxDownloadFile] - wxDownloadFile\u4E0B\u8F7D\u5B8C\u6210\uFF0CstatusCode \u5F02\u5E38 : " + url + " res : " + JSON.stringify(res);
                                        xgame.openLog && console.error(err);
                                        resolve({ sucess: false, nativePath: err, info: err });
                                    }
                                    else {
                                        var info = "[wxDownloadFile] - wxDownloadFile下载成功 : " + JSON.stringify(res);
                                        // xgame.openLog && console.log(info);
                                        resolve({ sucess: true, nativePath: res.tempFilePath, info: info });
                                    }
                                },
                                fail: function (err) {
                                    var errInfo = "[wxDownloadFile] - \u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25:" + url + " info:" + JSON.stringify(err);
                                    resolve({ sucess: false, nativePath: errInfo, info: errInfo });
                                },
                                complete: function (result) {
                                    // xgame.openLog && console.log(`[wxDownloadFile] - 下载事件完成:${url} info:${JSON.stringify(result)}`);
                                }
                            });
                        })];
                });
            });
        }
        WXTools.wxDownloadFile = wxDownloadFile;
        /**检查版本文件信息 */
        function wxReadFile(filePath, encoding) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    xgame.openLog && console.log("[wxReadFile] - 读取文件 : " + filePath);
                    try {
                        WXFS.accessSync(filePath);
                    }
                    catch (e) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve({ sucess: false, data: e, info: JSON.stringify(e) });
                            })];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            WXFS.readFile({
                                filePath: filePath,
                                encoding: encoding,
                                success: function (res) {
                                    if (res.data != null) {
                                        resolve({ sucess: true, data: res.data, info: JSON.stringify(res) });
                                        xgame.openLog && console.log("[wxReadFile] - 读取文件成功");
                                    }
                                    else {
                                        var err = "读取异常:数据为空";
                                        xgame.openLog && console.error("[wxReadFile] - 读取异常 : " + err);
                                        resolve({ sucess: false, data: err, info: err });
                                    }
                                },
                                fail: function (err) {
                                    var errInfo = "[wxReadFile] - 读取文件失败 : " + JSON.stringify(err);
                                    xgame.openLog && console.error(errInfo);
                                    resolve({ sucess: false, data: errInfo, info: errInfo });
                                },
                                complete: function (readCom) {
                                },
                            });
                        })];
                });
            });
        }
        WXTools.wxReadFile = wxReadFile;
        /**检查版本文件信息 */
        function wxWriteFile(filePath, data, encoding) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    // xgame.openLog && console.log("[wxWriteFile] - 写入文件 : " + filePath);
                    try {
                        WXFS.accessSync(filePath);
                        //文件存在就删除
                        WXFS.unlinkSync(filePath);
                    }
                    catch (e) {
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            WXFS.writeFile({
                                filePath: filePath,
                                data: data,
                                encoding: encoding,
                                success: function (res) {
                                    // //xgame.openLog && console.log("[wxWriteFile] - 写入文件成功 : " + JSON.stringify(res));
                                    resolve({ sucess: true, info: JSON.stringify(res) });
                                },
                                fail: function (err) {
                                    var errInfo = "[wxWriteFile] - 写入文件失败 : " + JSON.stringify(err);
                                    xgame.openLog && console.error(errInfo);
                                    resolve({ sucess: false, info: errInfo });
                                },
                                complete: function (readCom) {
                                    //xgame.openLog && console.log("[wxWriteFile] - 写入完成:" + filePath);
                                },
                            });
                        })];
                });
            });
        }
        WXTools.wxWriteFile = wxWriteFile;
        /**检查版本文件信息 */
        function wxUnZipFile(zipFilePath, targetPath) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    // xgame.openLog && console.log("[wxUnZipFile] - 解压文件 : " + zipFilePath);
                    try {
                        WXFS.accessSync(zipFilePath);
                    }
                    catch (e) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                xgame.openLog && console.error("[wxUnZipFile] - 本地不存在文件:" + zipFilePath);
                                resolve({ sucess: false, data: e, info: "本地不存在文件:" + zipFilePath });
                            })];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // xgame.openLog && console.log("[wxUnZipFile] - 解压到 : " + targetPath);
                            try {
                                WXFS.accessSync(zipFilePath);
                            }
                            catch (e) {
                                //xgame.openLog && console.error(`要解压的文件不存在 path:${zipFilePath} err:${JSON.stringify(e)}`);
                                return { sucess: false, data: "", info: JSON.stringify(e) };
                            }
                            WXFS.unzip({
                                zipFilePath: zipFilePath,
                                targetPath: targetPath,
                                success: function (res) {
                                    xgame.openLog && console.log("[wxUnZipFile] - 解压文件成功 : " + JSON.stringify(res));
                                    resolve({ sucess: true, data: res.data, info: JSON.stringify(res) });
                                },
                                fail: function (err) {
                                    var errInfo = "[wxUnZipFile] - 解压文件失败 : " + err.errMsg;
                                    xgame.openLog && console.error(errInfo);
                                    resolve({ sucess: false, data: errInfo, info: errInfo });
                                },
                                complete: function (readCom) {
                                    xgame.openLog && console.log("[wxUnZipFile] - \u89E3\u538B\u6587\u4EF6\u5B8C\u6210 : url->" + zipFilePath + " " + JSON.stringify(readCom));
                                },
                            });
                            return null;
                        })];
                });
            });
        }
        WXTools.wxUnZipFile = wxUnZipFile;
        function wxCreateFullPath(root, path) {
            return __awaiter(this, void 0, void 0, function () {
                var pathArr, curAddPath, _i, pathArr_1, dirPath, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // xgame.openLog && console.log(`[wxCreateFullPath] - path:${path}`);
                            if (!path || path == '')
                                return [2 /*return*/, { sucess: false, info: "[wxCreateFullPath] - \u521B\u5EFA\u8DEF\u5F84\u5931\u8D25 : \"" + path + "\"" }];
                            if (path.indexOf('/') == -1 && path.indexOf('.') != -1)
                                return [2 /*return*/, { sucess: false, info: "[wxCreateFullPath] - \u65E0\u9700\u521B\u5EFA\u8DEF\u5F84 : \"" + path + "\"" }];
                            pathArr = path.split('/');
                            // xgame.openLog && console.log(`[wxCreateFullPath] - 路径:${pathArr}`);
                            if (pathArr.length != 0 && pathArr[pathArr.length - 1].indexOf('.') != -1)
                                pathArr.splice(pathArr.length - 1, 1);
                            curAddPath = "";
                            _i = 0, pathArr_1 = pathArr;
                            _a.label = 1;
                        case 1:
                            if (!(_i < pathArr_1.length)) return [3 /*break*/, 4];
                            dirPath = pathArr_1[_i];
                            curAddPath += (dirPath + "/");
                            return [4 /*yield*/, wxCreateDir(root + curAddPath)];
                        case 2:
                            result = _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, { sucess: true, info: "[wxCreateFullPath] - \u521B\u5EFA\u8DEF\u5F84\u5B8C\u6BD5 : \"" + path + "\"" }];
                    }
                });
            });
        }
        WXTools.wxCreateFullPath = wxCreateFullPath;
        function wxCreateDir(path) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var isCreate = true;
                            try {
                                WXFS.accessSync(path);
                                isCreate = false;
                                // console.warn(`[wxCreateDir] - 文件已存在无需生成 path:${path}`);
                            }
                            catch (err) { }
                            if (isCreate) {
                                WXFS.mkdir({
                                    dirPath: path,
                                    success: function (res) {
                                        var tmpResult = "[wxCreatePath] - [wxCreatePath] - \u6210\u529F - \u751F\u6210\u76EE\u6807\u6587\u4EF6\u5939: " + path;
                                        // xgame.openLog && console.log(tmpResult);
                                        resolve({ sucess: true, info: tmpResult + JSON.stringify(res) });
                                    }, fail: function (res) {
                                        var tmpResult = "[wxCreatePath] - \u5931\u8D25 - \u751F\u6210\u76EE\u6807\u6587\u4EF6\u5939: " + path;
                                        xgame.openLog && console.error(tmpResult);
                                        resolve({ sucess: false, info: tmpResult + JSON.stringify(res) });
                                    }, complete: function (res) { }
                                });
                            }
                            else {
                                resolve({ sucess: true, info: "文件已存在无需生成:" + path });
                            }
                        })];
                });
            });
        }
        WXTools.wxCreateDir = wxCreateDir;
        /**删除本地缓存文件夹 */
        function wxRemovePath(path) {
            return __awaiter(this, void 0, void 0, function () {
                var WXFS;
                return __generator(this, function (_a) {
                    WXFS = wx.getFileSystemManager();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            try {
                                WXFS.accessSync(path);
                            }
                            catch (e) {
                                // xgame.openLog && console.error('[wxRemoveUserDir] - 要删除的文件夹');
                                resolve({ sucess: true, info: JSON.stringify(e) });
                                return;
                            }
                            //删除文件
                            walkFile(path, function (file) {
                                WXFS.unlinkSync(file);
                                // xgame.openLog && console.error(`[wxRemoveUserDir] - 删除文件 : ${file}`);
                            });
                            //删除文件夹
                            walkDir(path, function (dir) {
                                WXFS.rmdirSync(dir);
                                // xgame.openLog && console.error(`[wxRemoveUserDir] - 删除文件夹 : ${dir}`);
                            });
                            resolve({ sucess: true, info: "[wxRemovePath] - \u6E05\u9664\u8DEF\u5F84\u4E0B\u6240\u6709\u6587\u4EF6: " + path });
                        })];
                });
            });
        }
        WXTools.wxRemovePath = wxRemovePath;
        function walkFile(dirname, callback) {
            var files = wx.getFileSystemManager().readdirSync(dirname);
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var f = files_1[_i];
                var file = dirname + "/" + f;
                var stat = wx.getFileSystemManager().statSync(file);
                if (stat.isDirectory()) {
                    walkFile(file, callback);
                }
                else {
                    callback(file);
                }
            }
        }
        function walkDir(dirname, callback) {
            var files = wx.getFileSystemManager().readdirSync(dirname);
            for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                var f = files_2[_i];
                var file = dirname + "/" + f;
                var stat = wx.getFileSystemManager().statSync(file);
                if (stat.isDirectory()) {
                    walkDir(file, callback);
                    callback(file);
                }
            }
        }
        /**
         * 获取授权 AuthSetting
         * @param key 授权的Key
         */
        function getSetting(scope) {
            return new Promise(function (resolve, reject) {
                // 查看是否授权
                wx.getSetting({
                    complete: function (res) {
                        resolve(res.authSetting[scope]);
                    }
                });
            });
        }
        WXTools.getSetting = getSetting;
        /**
         * 获取授权
         * scope.userInfo	wx.getUserInfo	用户信息
         * scope.userLocation	wx.getLocation	地理位置
         * scope.werun	wx.getWeRunData	微信运动步数
         * scope.writePhotosAlbum
         * @param scope 授权的Key
         */
        function authorize(scope) {
            return new Promise(function (resolve, reject) {
                // 查看是否授权
                wx.authorize({
                    scope: scope,
                    success: function (res) {
                        resolve(true);
                    },
                    fail: function (res) {
                        resolve(false);
                    }
                });
            });
        }
        WXTools.authorize = authorize;
    })(WXTools = xgame.WXTools || (xgame.WXTools = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var AdEventKey;
    (function (AdEventKey) {
        AdEventKey[AdEventKey["open"] = 0] = "open";
        AdEventKey[AdEventKey["close"] = 1] = "close";
        AdEventKey[AdEventKey["begin"] = 2] = "begin";
        AdEventKey[AdEventKey["midwayClose"] = 3] = "midwayClose";
        AdEventKey[AdEventKey["playOver"] = 4] = "playOver";
        AdEventKey[AdEventKey["getAward"] = 5] = "getAward";
        AdEventKey[AdEventKey["noAd"] = 6] = "noAd";
        AdEventKey[AdEventKey["noInit"] = 7] = "noInit";
        AdEventKey[AdEventKey["shareFail"] = 8] = "shareFail";
    })(AdEventKey = xgame.AdEventKey || (xgame.AdEventKey = {}));
    var WxAdCtrl = /** @class */ (function () {
        function WxAdCtrl() {
            this._rewardedVideoAd = undefined;
            this._curKey = null;
        }
        /**
         * 初始化广告
         */
        WxAdCtrl.prototype.initAd = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (WxAdCtrl.isIniting) {
                                xgame.openLog && console.error("[WxAdCtrl.initAd] \u5728\u521D\u59CB\u5316\u4E2D\u65E0\u6CD5\u518D\u6B21\u521D\u59CB\u5316");
                                return [2 /*return*/];
                            }
                            WxAdCtrl.isIniting = true;
                            return [4 /*yield*/, this.initAD(key)];
                        case 1:
                            _a.sent();
                            WxAdCtrl.isIniting = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        WxAdCtrl.prototype.initAD = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    xgame.openLog && console.log("[WxAdCtrl.initAD] \u5F00\u59CB\u521D\u59CB\u5316 " + key);
                    if (key != null) {
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var startTime, isSucess;
                                return __generator(this, function (_a) {
                                    if (this._curKey != key) {
                                        if (this._rewardedVideoAd) {
                                            this._rewardedVideoAd.offLoad(this.onLoad);
                                            this._rewardedVideoAd.offError(this.onError);
                                            this._rewardedVideoAd.destroy && this._rewardedVideoAd.destroy();
                                        }
                                        startTime = Date.now();
                                        isSucess = false;
                                        while (Date.now() - startTime < 500) {
                                            try {
                                                this._rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: key, multiton: true });
                                                this._rewardedVideoAd.onLoad(this.onLoad);
                                                this._rewardedVideoAd.onError(this.onError);
                                                this._rewardedVideoAd.load().then(function () {
                                                    resolve(true);
                                                }).catch(function () {
                                                    resolve(false);
                                                });
                                                isSucess = true;
                                                break;
                                            }
                                            catch (e) {
                                                console.error("[\u6784\u67B6\u89C6\u9891\u7EC4\u4EF6\u5931\u8D25]");
                                                if (Date.now() - startTime > 500) {
                                                    resolve(false);
                                                }
                                            }
                                        }
                                        if (!isSucess)
                                            resolve(false);
                                        // resolve(WxAdCtrl.isLoad);
                                        this._curKey = key;
                                    }
                                    else {
                                        resolve(WxAdCtrl.isLoad);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    }
                    return [2 /*return*/, WxAdCtrl.isLoad];
                });
            });
        };
        /**
         * 显示广告
         * @param key 指定的广告key
         */
        WxAdCtrl.prototype.show = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.initAD(key)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/, AdEventKey.noInit];
                            }
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    //处理关闭逻辑
                                    var onClose = function (res) {
                                        if (res && res.isEnded || res === undefined) {
                                            xgame.openLog && console.log("[WxAdCtrl.show] - \u64AD\u653E\u5B8C\u6210 " + JSON.stringify(res));
                                            resolve(AdEventKey.playOver);
                                            _this.handleBIAdLog(xgame.AdEventKey.playOver);
                                            // 正常播放结束，可以下发游戏奖励
                                        }
                                        else {
                                            xgame.openLog && console.log("[WxAdCtrl.show] - \u64AD\u653E\u5B8C\u6210 " + JSON.stringify(res));
                                            resolve(AdEventKey.midwayClose);
                                            _this.handleBIAdLog(xgame.AdEventKey.midwayClose);
                                            // 播放中途退出，不下发游戏奖励
                                        }
                                        _this._rewardedVideoAd.offClose(onClose);
                                    };
                                    xgame.openLog && console.log("[WxAdCtrl.show] - \u663E\u793A\u5E7F\u544A key:" + _this._curKey);
                                    //启动显示内容
                                    _this._rewardedVideoAd.show()
                                        .catch(function (err) {
                                        xgame.openLog && console.log("[WxAdCtrl.show] - \u5E7F\u544A\u5F02\u5E38 key:" + _this._curKey);
                                        WxAdCtrl.isLoad = false;
                                        // resolve(AdEventKey.noAd);
                                        // 失败重试
                                        _this._rewardedVideoAd.load()
                                            .then(function () { return function () {
                                            WxAdCtrl.isLoad = true;
                                            _this._rewardedVideoAd.show();
                                            _this._rewardedVideoAd.onClose(onClose);
                                            _this.handleBIAdLog(xgame.AdEventKey.begin);
                                        }; })
                                            .catch(function (err) {
                                            WxAdCtrl.isLoad = true;
                                            resolve(AdEventKey.noAd);
                                        });
                                    }).then(function () {
                                        xgame.openLog && console.error("[WxAdCtrl.show] - \u5E7F\u544A\u663E\u793A key:" + _this._curKey);
                                        WxAdCtrl.isLoad = true;
                                        _this.handleBIAdLog(xgame.AdEventKey.begin);
                                        _this._rewardedVideoAd.onClose(onClose);
                                    });
                                })];
                    }
                });
            });
        };
        WxAdCtrl.prototype.onLoad = function () {
            WxAdCtrl.isLoad = true;
            xgame.openLog && console.log("[WxAdCtrl.onLoad] \u5E7F\u544A\u52A0\u8F7D\u5B8C\u6BD5\uFF01");
        };
        /* errCode
        // 1000	后端接口调用失败
        // 1001	参数错误
        // 1002	广告单元无效
        // 1003	内部错误
        // 1004	无合适的广告
        // 1005	广告组件审核中
        // 1006	广告组件被驳回
        // 1007	广告组件被封禁
        / 1008	广告单元已关闭
        */
        WxAdCtrl.prototype.onError = function (res) {
            WxAdCtrl.isLoad = false;
            xgame.openLog && console.log("[WxAdCtrl.onError] \u5E7F\u544A\u51FA\u73B0\u9519\u8BEF\uFF01 " + JSON.stringify(res));
        };
        WxAdCtrl.prototype.handleBIAdLog = function (type) {
        };
        WxAdCtrl.isIniting = false;
        WxAdCtrl.isLoad = false;
        return WxAdCtrl;
    }());
    xgame.WxAdCtrl = WxAdCtrl;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var EnumWxAudioState;
    (function (EnumWxAudioState) {
        EnumWxAudioState[EnumWxAudioState["None"] = 0] = "None";
        EnumWxAudioState[EnumWxAudioState["PlayAcion"] = 1] = "PlayAcion";
        EnumWxAudioState[EnumWxAudioState["PauseAction"] = 2] = "PauseAction";
        EnumWxAudioState[EnumWxAudioState["ResetAction"] = 3] = "ResetAction";
        EnumWxAudioState[EnumWxAudioState["Playing"] = 4] = "Playing";
        EnumWxAudioState[EnumWxAudioState["Stop"] = 5] = "Stop";
        EnumWxAudioState[EnumWxAudioState["Pause"] = 6] = "Pause";
    })(EnumWxAudioState || (EnumWxAudioState = {}));
    //微信音乐播放对象包装
    var WxAudio = /** @class */ (function (_super) {
        __extends(WxAudio, _super);
        function WxAudio(url) {
            var _this = _super.call(this) || this;
            //调试变量
            _this.isDebug = false;
            _this.audio = wx.createInnerAudioContext();
            _this.audio.autoplay = false;
            _this.audio.volume = 0;
            _this.url = url;
            _this.audio.src = _this.url;
            // 监听音频播放事件
            _this.onPlay = _this.onPlay.bind(_this);
            _this.onCanplay = _this.onCanplay.bind(_this);
            _this.onEnded = _this.onEnded.bind(_this);
            _this.onError = _this.onError.bind(_this);
            _this.onPause = _this.onPause.bind(_this);
            _this.onSeeked = _this.onSeeked.bind(_this);
            _this.onSeeking = _this.onSeeking.bind(_this);
            _this.onStop = _this.onStop.bind(_this);
            _this.onWaiting = _this.onWaiting.bind(_this);
            _this.initCall();
            return _this;
        }
        WxAudio.prototype.initCall = function () {
            this.audio.onPlay(this.onPlay);
            // this.audio.onCanplay(this.onCanplay);
            this.audio.onEnded(this.onEnded);
            this.audio.onError(this.onError);
            this.audio.onPause(this.onPause);
            this.audio.onSeeked(this.onSeeked);
            // this.audio.onSeeking(this.onSeeking);
            this.audio.onStop(this.onStop);
            // this.audio.onWaiting(this.onWaiting);
        };
        WxAudio.prototype.dispose = function () {
            WxAudio.curPlayCount--;
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + " - dispose");
            this.audio.pause();
            this.audio.offPlay(this.onPlay);
            // this.audio.offCanplay(this.onCanplay);
            this.audio.offEnded(this.onEnded);
            this.audio.offError(this.onError);
            this.audio.offPause(this.onPause);
            this.audio.offSeeked(this.onSeeked);
            // this.audio.offSeeking(this.onSeeking);
            this.audio.offStop(this.onStop);
            // this.audio.offWaiting(this.onWaiting);
            // this.audio.offTimeUpdate(this.onTimeUpdate);
            delete this.onPlay;
            delete this.onCanplay;
            delete this.onEnded;
            delete this.onError;
            delete this.onPause;
            delete this.onSeeked;
            delete this.onSeeking;
            delete this.onStop;
            delete this.onWaiting;
            this.audio.destroy();
            delete this.audio;
        };
        /**
         * 播放音乐，偏移n秒的位置开始播放
         * @param  {number} offsetTime
         */
        WxAudio.prototype.play = function (playStartTime, isLoop, isSeek) {
            if (playStartTime === void 0) { playStartTime = 0; }
            if (isLoop === void 0) { isLoop = false; }
            if (isSeek === void 0) { isSeek = false; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (!this.audio) {
                        this.isDebug && xgame.openLog && console.error(this.getAudioInfo() + " - \u64AD\u653E\u5931\u8D25\uFF0Caudio == null");
                        return [2 /*return*/];
                    }
                    WxAudio.curPlayCount++;
                    if (isLoop)
                        this.audio.loop = isLoop;
                    new Promise(function (resolve, reject) {
                        var srcV = _this.audio.volume;
                        var startTime = xgame.getTimer();
                        var posTime = 0;
                        var onError = function (e) {
                            _this.isDebug && xgame.openLog && console.error(_this.getAudioInfo() + " onError  - url:" + _this.url + " " + JSON.stringify(e));
                            _this.audio.offError(onError);
                            _this.audio.offPlay(onPlay);
                            _this.audio.offError(onError);
                            _this.audio.onPlay(_this.onPlay);
                            _this.destroy();
                            resolve();
                        };
                        var onSeek = function () {
                            _this.audio.volume = srcV;
                            _this.audio.offSeeked(onSeek);
                            _this.audio.onSeeked(_this.onSeeked);
                            _this.isDebug && xgame.openLog && console.log(_this.getAudioInfo() + " seek \u64AD\u653E\u5EF6\u8FDF\u65F6\u95F4 - seekDelayTime:" + (xgame.getTimer() - startTime));
                        };
                        var onPlay = function () {
                            _this.audio.offPlay(onPlay);
                            _this.audio.onPlay(_this.onPlay);
                            _this.audio.offError(onError);
                            _this.audio.onError(_this.onError);
                            if (isSeek) {
                                _this.audio.volume = 0;
                                // let addDelayTime = xgame.getXGame().versionMgr.isAndroid() ? WxAudio.defaultAndroidDelayTime : WxAudio.defaultIOSDelayTime;
                                var addDelayTime = true ? WxAudio.defaultAndroidDelayTime : WxAudio.defaultIOSDelayTime;
                                posTime = playStartTime + (xgame.getTimer() - startTime) * 0.001 + addDelayTime;
                                _this.isDebug && xgame.openLog && console.log(_this.getAudioInfo() + " seek - fiexdTime:" + (xgame.getTimer() - startTime));
                                _this.audio.onSeeked(onSeek);
                                _this.audio.seek(posTime);
                            }
                            resolve();
                        };
                        _this.audio.offPlay(_this.onPlay);
                        _this.audio.onPlay(onPlay);
                        _this.audio.offError(_this.onError);
                        _this.audio.onError(onError);
                        if (isSeek)
                            _this.audio.volume = 0;
                        _this.isDebug && xgame.openLog && console.log(_this.getAudioInfo() + " play");
                        _this.audio.play();
                    });
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 暂停
         * @param  {number} offsetTime
         */
        WxAudio.prototype.pause = function () {
            this.audio.pause();
        };
        // 监听音频进入可以播放状态的事件
        WxAudio.prototype.onCanplay = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onCanplay audioTime:" + this.audio.currentTime + " \u5EF6\u8FDF\u65F6\u95F4:" + (xgame.getTimer() * 0.001 - this._tempStartPlayTime)));
        };
        WxAudio.prototype.onPlay = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onPlay audioTime:" + this.audio.currentTime + " \u5EF6\u8FDF\u65F6\u95F4:" + (xgame.getTimer() * 0.001 - this._tempStartPlayTime)));
        };
        // 监听音频暂停事件
        WxAudio.prototype.onPause = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onPause audioTime:" + this.audio.currentTime + " \u76D1\u542C\u97F3\u9891\u6682\u505C\u4E8B\u4EF6"));
        };
        // 监听音频停止事件
        WxAudio.prototype.onStop = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onStop audioTime:" + this.audio.currentTime + " \u76D1\u542C\u97F3\u9891\u505C\u6B62\u4E8B\u4EF6"));
        };
        // 监听音频自然播放至结束的事件
        WxAudio.prototype.onEnded = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onEnded audioTime:" + this.audio.currentTime + " \u76D1\u542C\u97F3\u9891\u81EA\u7136\u64AD\u653E\u81F3\u7ED3\u675F\u7684\u4E8B\u4EF6"));
            this.emit(xgame.sound_complete);
        };
        // 监听音频播放进度更新事件
        WxAudio.prototype.onTimeUpdate = function (value) {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onTimeUpdate audioTime:" + this.audio.currentTime + " \u64AD\u653E\u8FDB\u5EA6:" + value));
        };
        // 监听音频播放错误事件
        WxAudio.prototype.onError = function (e) {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onError audioTime:" + this.audio.currentTime + " \u76D1\u542C\u97F3\u9891\u64AD\u653E\u9519\u8BEF\u4E8B\u4EF6:" + e));
            this.destroy();
        };
        // 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
        WxAudio.prototype.onWaiting = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + (" onWaiting audioTime:" + this.audio.currentTime + " \u76D1\u542C\u97F3\u9891\u52A0\u8F7D\u4E2D\u4E8B\u4EF6\uFF0C\u5F53\u97F3\u9891\u56E0\u4E3A\u6570\u636E\u4E0D\u8DB3\uFF0C\u9700\u8981\u505C\u4E0B\u6765\u52A0\u8F7D\u65F6\u4F1A\u89E6\u53D1"));
        };
        // 监听音频进行跳转操作的事件
        WxAudio.prototype.onSeeking = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ("onSeeking audioTime:" + this.audio.currentTime + " \u5EF6\u8FDF\u65F6\u95F4:" + (xgame.getTimer() * 0.001 - this._tempStartPlayTime)));
        };
        // 监听音频完成跳转操作的事件
        WxAudio.prototype.onSeeked = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ("onSeeked audioTime:" + this.audio.currentTime + " \u5EF6\u8FDF\u65F6\u95F4:" + (xgame.getTimer() * 0.001 - this._tempStartPlayTime)));
        };
        WxAudio.prototype.getAudioInfo = function () {
            return "[WxAudio] " + WxAudio.curPlayCount + " - audioUrl:" + this.url;
        };
        WxAudio.prototype.destroy = function () {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + " - destroy");
            if (this.audio) {
                this.dispose();
            }
        };
        WxAudio.delayTimeList = [];
        WxAudio.defaultAndroidDelayTime = 0.48;
        WxAudio.defaultIOSDelayTime = 0.01;
        WxAudio.curPlayCount = 0;
        return WxAudio;
    }(xgame.IAudio));
    xgame.WxAudio = WxAudio;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var WxBannerCtrl = /** @class */ (function () {
        function WxBannerCtrl() {
            this._rewardedBannerAd = undefined;
            this._curKey = null;
        }
        WxBannerCtrl.prototype.showBannerAd = function (key, style, adIntervals) {
            if (adIntervals === void 0) { adIntervals = 30; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (!key || !style)
                        return [2 /*return*/];
                    if (this._rewardedBannerAd && this._curKey != key) {
                        this._rewardedBannerAd.destroy();
                        this._rewardedBannerAd = wx.createBannerAd({
                            adUnitId: key,
                            style: style,
                            adIntervals: adIntervals
                        });
                    }
                    if (!this._rewardedBannerAd) {
                        this._rewardedBannerAd = wx.createBannerAd({
                            adUnitId: key,
                            style: style,
                            adIntervals: adIntervals
                        });
                    }
                    this._curKey = key;
                    this._rewardedBannerAd.onError(function (res) {
                        console.log("WxAdCtrl] : \u5E7F\u544ABanner\u6CA1\u6709\u5E7F\u544A\u7684\u9519\u8BEF" + JSON.stringify(res) + " key:" + _this._curKey);
                    });
                    this._rewardedBannerAd.onResize(function (res) {
                        var size = cc.view.getFrameSize();
                        var systemInfo = wx.getSystemInfoSync();
                        var top = size.height - _this._rewardedBannerAd.style.realHeight;
                        if (systemInfo.model.indexOf("iPhone") != -1 && size.width / size.height < 0.48) {
                            top -= 25;
                        }
                        _this._rewardedBannerAd.style.top = top;
                        _this._rewardedBannerAd.style.height = _this._rewardedBannerAd.style.realHeight;
                        console.log(_this._rewardedBannerAd.style.width, _this._rewardedBannerAd.style.height);
                        console.log(_this._rewardedBannerAd.style.realWidth, _this._rewardedBannerAd.style.realHeight);
                    });
                    this._rewardedBannerAd.onLoad(function () {
                        console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F key:" + _this._curKey);
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this._rewardedBannerAd.show().then(function () {
                                // this.handleBIAdLog(xgame.AdEventKey.begin);
                                resolve(xgame.AdEventKey.playOver);
                            }).catch(function () {
                                // this.handleBIAdLog(xgame.AdEventKey.noAd);
                                resolve(xgame.AdEventKey.noAd);
                            });
                        })];
                });
            });
        };
        WxBannerCtrl.prototype.hideBannerAd = function () {
            if (this._rewardedBannerAd)
                this._rewardedBannerAd.hide();
        };
        //     值	说明	最低版本
        // 1000	后端接口调用失败	
        // 1001	参数错误	
        // 1002	广告单元无效	
        // 1003	内部错误	
        // 1004	无合适的广告	
        // 1005	广告组件审核中	
        // 1006	广告组件被驳回	
        // 1007	广告组件被封禁	
        // 1008	广告单元已关闭
        WxBannerCtrl.prototype.onError = function (res) {
            console.log("WxAdCtrl] : \u5E7F\u544ABanner\u6CA1\u6709\u5E7F\u544A\u7684\u9519\u8BEF" + JSON.stringify(res));
        };
        WxBannerCtrl.isLoad = false;
        return WxBannerCtrl;
    }());
    xgame.WxBannerCtrl = WxBannerCtrl;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var WxInterstitialCtrl = /** @class */ (function () {
        function WxInterstitialCtrl() {
            this._curKey = null;
            this._insertAd = null;
        }
        WxInterstitialCtrl.prototype.showInterstitialAd = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var result, onInterstitialClose_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!key) {
                                            resolve(xgame.AdEventKey.noInit);
                                        }
                                        return [4 /*yield*/, this.init(key)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            onInterstitialClose_1 = function () {
                                                console.log("插屏广告展示");
                                                _this._insertAd.offClose(onInterstitialClose_1);
                                                resolve(xgame.AdEventKey.playOver);
                                            };
                                            if (this._insertAd) {
                                                this._insertAd.onClose(onInterstitialClose_1);
                                                this._insertAd.show().then(function () {
                                                }).catch(function (res) {
                                                    xgame.openLog && console.error("\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF\u7801=>" + res.errCode + "------\u63D2\u5C4F\u5E7F\u544A\u663E\u793A\u5931\u8D25\u9519\u8BEF\u4FE1\u606F=>" + res.errMsg + "------\u5E7F\u544Aid" + key);
                                                    resolve(xgame.AdEventKey.noAd);
                                                });
                                            }
                                        }
                                        else {
                                            resolve(xgame.AdEventKey.noAd);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        };
        WxInterstitialCtrl.prototype.init = function (key) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var onInterstitialLoad = function () {
                    console.log("插屏广告加载成功");
                    resolve(true);
                };
                var onInterstitialError = function (res) {
                    console.log("插屏广告展示错误");
                    xgame.openLog && console.error("\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF\u7801=>" + res.errCode + "------\u63D2\u5C4F\u5E7F\u544A\u663E\u793A\u5931\u8D25\u9519\u8BEF\u4FE1\u606F=>" + res.errMsg + "------\u5E7F\u544Aid" + key);
                    resolve(false);
                };
                if (_this._insertAd) {
                    _this._insertAd.offError(onInterstitialError);
                    _this._insertAd.offLoad(onInterstitialLoad);
                    _this._insertAd.destroy();
                }
                _this._insertAd = wx.createInterstitialAd({
                    adUnitId: key
                });
                _this._curKey = key;
                _this._insertAd.onLoad(onInterstitialLoad);
                _this._insertAd.onError(onInterstitialError);
                _this._insertAd.load();
            });
        };
        return WxInterstitialCtrl;
    }());
    xgame.WxInterstitialCtrl = WxInterstitialCtrl;
})(xgame || (xgame = {}));
//声明导出静态数据后的静态块
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        var StaticDataMgr = /** @class */ (function () {
            function StaticDataMgr() {
                /**原始数据 */
                this._srcStaticData = [];
            }
            StaticDataMgr.prototype.onUpdate = function (dt) {
            };
            StaticDataMgr.prototype.start = function () {
            };
            /**
            * 初始化接口
            */
            StaticDataMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[StaticDataMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        this.isFinish = true;
                        return [2 /*return*/, this.isFinish];
                    });
                });
            };
            /**
             * 重置接口
             */
            StaticDataMgr.prototype.reset = function () {
            };
            /**
             * 销毁接口
             */
            StaticDataMgr.prototype.dispose = function () {
            };
            StaticDataMgr.prototype.converData = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var excelEnum, excelEnumLen, index, sheetEnumObj, sheetEnumLen, indey;
                    return __generator(this, function (_a) {
                        if (!xStatic) {
                            xgame.openLog && console.log("[StaticDataMgr] : \u6CA1\u627E\u5230 xStatic \u6A21\u5757\uFF0C\u68C0\u67E5\u5BFC\u51FAexcel\u6570\u636E\u662F\u5426\u6B63\u786E");
                            return [2 /*return*/];
                        }
                        excelEnum = xStatic.EnumExcelKey;
                        excelEnumLen = Object.keys(excelEnum).length / 2;
                        for (index = 0; index < excelEnumLen; index++) {
                            sheetEnumObj = xStatic["Enum" + excelEnum[index]];
                            sheetEnumLen = Object.keys(sheetEnumObj).length / 2;
                            for (indey = 0; indey < sheetEnumLen; indey++) {
                                this._srcStaticData[index][indey] = this.converArrToObj(excelEnum[index], sheetEnumObj[indey], this._srcStaticData[index][indey]);
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            };
            StaticDataMgr.prototype.converArrToObj = function (excelName, sheetName, sheet) {
                var rows = sheet;
                sheet = {};
                var propertyKeyArr = xStatic[xgame.StringTools.lowerFirstChat(sheetName) + "PropertyNames"];
                if (propertyKeyArr === undefined) {
                    console.error("[StaticDataMgr.converArrToObj] \u914D\u7F6E\u8868\u751F\u6210\u4FE1\u606F\u9519\u8BEF excel:" + excelName + " sheet:" + sheetName);
                    return sheet;
                }
                var sheetType = xStatic[xgame.StringTools.lowerFirstChat(sheetName) + "PropertyType"];
                //清空原来的数据
                for (var index = 0; index < rows.length; index++) {
                    var propertyArr = rows[index];
                    var tmpObj = {};
                    var firstKey = 'id';
                    for (var indey = 0; indey < propertyKeyArr.length; indey++) {
                        var propertyKey = propertyKeyArr[indey];
                        if (indey == 0)
                            firstKey = propertyKey;
                        tmpObj[propertyKey] = propertyArr[indey];
                    }
                    if (sheetType == StaticDataMgr.portrait)
                        sheet["id_constlist"] = tmpObj;
                    else {
                        if (sheet["id_" + tmpObj[firstKey]] != null) {
                            console.error("[StaticDataMgr.converArrToObj] excel->" + excelName + " sheet->" + sheetName + " id->" + tmpObj[firstKey] + " \u5DF2\u5B58\u5728\uFF0C\u88AB excel\u7B2C" + index + "\u884C\u6570\u636E\u8986\u76D6");
                        }
                        sheet["id_" + tmpObj[firstKey]] = tmpObj;
                    }
                }
                return sheet;
            };
            /**
             * 异步初始化
             * @param remoteUrl 远程加载相对路径
             * @param remoteList:Array<number> 标记远程加载的配置表
             */
            StaticDataMgr.prototype.loadJsonData = function (remoteUrl, remoteList) {
                if (remoteUrl === void 0) { remoteUrl = null; }
                if (remoteList === void 0) { remoteList = []; }
                return __awaiter(this, void 0, void 0, function () {
                    var excelEnum, excelEnumLen, totalExcelArr, index, excelName, allBeginTime, decodeTime, index, excelName, jsonData, loadedResource, beginTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!xStatic) {
                                    xgame.openLog && console.log("[StaticDataMgr] : \u6CA1\u627E\u5230 xStatic \u6A21\u5757\uFF0C\u68C0\u67E5\u5BFC\u51FAexcel\u6570\u636E\u662F\u5426\u6B63\u786E");
                                    return [2 /*return*/];
                                }
                                excelEnum = xStatic.EnumExcelKey;
                                excelEnumLen = Object.keys(excelEnum).length / 2;
                                totalExcelArr = [];
                                //格式化名字
                                for (index = 0; index < remoteList.length; index++) {
                                    excelName = remoteList[index];
                                    excelName = excelName.toLowerCase().trim();
                                    excelName = excelName.replace('_', '');
                                    remoteList[index] = excelName;
                                }
                                allBeginTime = Date.now();
                                xgame.openLog && console.log("[\u89E3\u6790\u914D\u7F6E\u5F00\u59CB] -> " + allBeginTime);
                                decodeTime = 0;
                                index = 0;
                                _a.label = 1;
                            case 1:
                                if (!(index < excelEnumLen)) return [3 /*break*/, 7];
                                excelName = excelEnum[index];
                                excelName = excelName.toLowerCase().trim();
                                excelName = excelName.replace('_', '');
                                jsonData = null;
                                if (!(remoteUrl && remoteList.indexOf(excelName) != -1)) return [3 /*break*/, 3];
                                return [4 /*yield*/, xgame.loadUrl(remoteUrl + "/xStatic/" + excelName + ".txt?t=" + Date.now() % 1000 * 60 * 5, 'text')];
                            case 2:
                                jsonData = _a.sent();
                                _a.label = 3;
                            case 3:
                                if (!!jsonData) return [3 /*break*/, 5];
                                return [4 /*yield*/, xgame.loadRes("xStatic/" + excelName, cc.TextAsset)];
                            case 4:
                                loadedResource = _a.sent();
                                if (loadedResource == null || loadedResource.text == null) {
                                    console.error("[StaticDtaMgr.loadJsonData] \u68C0\u67E5 " + excelName + ".txt \u6587\u4EF6\u662F\u5426\u5B58\u5728\uFF0C\u6216\u8005cocos\u672A\u5237\u65B0\u6587\u4EF6\u8D44\u6E90\u94FE\u8868");
                                }
                                else {
                                    beginTime = Date.now();
                                    xgame.openLog && console.log("[\u89E3\u6790\u914D\u7F6E\u5F00\u59CB] -> " + excelName + " " + beginTime);
                                    jsonData = JSON.parse(xgame.NormalEncypt.decrypt(loadedResource.text, "vL3XgvvEv28im"));
                                    xgame.openLog && console.log("[\u89E3\u6790\u914D\u7F6E\u5B8C\u6210] -> " + excelName + " " + (Date.now() - beginTime) + " ms");
                                    decodeTime += Date.now() - beginTime;
                                }
                                _a.label = 5;
                            case 5:
                                totalExcelArr.push(jsonData);
                                _a.label = 6;
                            case 6:
                                index++;
                                return [3 /*break*/, 1];
                            case 7:
                                xgame.openLog && console.log("[\u89E3\u6790\u914D\u7F6E\u7ED3\u675F] -> " + (Date.now() - allBeginTime) + " ms \u89E3\u5BC6\u65F6\u95F4: " + decodeTime + " ms");
                                this._srcStaticData = totalExcelArr;
                                return [4 /*yield*/, this.converData()];
                            case 8:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             *
             * @param excelEnum excel 枚举
             * @param sheetEnum sheet 枚举
             * @param key 数据唯一Key
             */
            StaticDataMgr.prototype.getConfig = function (excelEnum, sheetEnum, key) {
                var result = {};
                var targetKey = "id_" + key;
                result = this._srcStaticData[excelEnum][sheetEnum][targetKey];
                if (!result)
                    xgame.openLog && console.log("[StaticDataMgr - getConfig] \u5728 " + xStatic.EnumExcelKey[excelEnum] + "->" + xStatic.EnumExcelKey[sheetEnum] + " \u627E\u4E0D\u5230 key\u4E3A:" + targetKey + " \u7684\u6570\u636E!");
                return result;
            };
            /**
             *
             * @param excelEnum excel 枚举
             * @param sheetEnum sheet 枚举
             * @param key 数据唯一Key
             */
            StaticDataMgr.prototype.getSheet = function (excelEnum, sheetEnum) {
                var result = null;
                result = this._srcStaticData[excelEnum][sheetEnum];
                return result;
            };
            /**
             * getKey
             **/
            StaticDataMgr.prototype.getKey = function (id) {
                return "id_" + id;
            };
            //横向属性值
            StaticDataMgr.landscape = "landscape";
            //纵向属性值
            StaticDataMgr.portrait = "portrait";
            return StaticDataMgr;
        }());
        mgr.StaticDataMgr = StaticDataMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
/**
 * xSystem.sys 命名空间为子系统的系统对象命名，不可用于其他位置
 */
var xgame;
(function (xgame) {
    /**
     * 枚举系统事件
     */
    var EnumSysEvtKey;
    (function (EnumSysEvtKey) {
        //网络连接
        EnumSysEvtKey[EnumSysEvtKey["networkOpen"] = 0] = "networkOpen";
        //网络异常
        EnumSysEvtKey[EnumSysEvtKey["networkError"] = 1] = "networkError";
        //网络停止
        EnumSysEvtKey[EnumSysEvtKey["networkClose"] = 2] = "networkClose";
        /** 所有board都关闭 */
        EnumSysEvtKey[EnumSysEvtKey["ui_allboard_hide"] = 3] = "ui_allboard_hide";
        /** 所有tips关闭 */
        EnumSysEvtKey[EnumSysEvtKey["ui_alltips_hide"] = 4] = "ui_alltips_hide";
    })(EnumSysEvtKey = xgame.EnumSysEvtKey || (xgame.EnumSysEvtKey = {}));
})(xgame || (xgame = {}));
//声明导出静态数据后的静态块
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        var SystemMgr = /** @class */ (function (_super) {
            __extends(SystemMgr, _super);
            function SystemMgr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.isFinish = false;
                /**系统对象数组*/
                _this._systems = {};
                /**是否更新 */
                _this.isUpdate = false;
                return _this;
            }
            /**
            * 初始化接口
            */
            SystemMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[SystemMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        if (!xgame.getXGame().data.isFinish)
                            return [2 /*return*/, false];
                        this.registeredSubSystemInfo();
                        this.isFinish = true;
                        return [2 /*return*/, this.isFinish];
                    });
                });
            };
            SystemMgr.prototype.start = function () {
                /**启动所有系统 */
                for (var sysName in this._systems) {
                    var tmpSystemObj = this._systems[sysName].system;
                    tmpSystemObj.start();
                }
                xgame.getXGame().on(xgame.eventKey.xgame_user_init, this.onInitSystem, this);
                xgame.getXGame().on(xgame.eventKey.xgame_game_start, this.onStartUpdate, this);
            };
            SystemMgr.prototype.onInitSystem = function () {
                if (this.isUpdate)
                    return;
                /**更新所有系统 */
                for (var name_1 in this._systems) {
                    this._systems[name_1].system.onInitSystem();
                }
                /**首次启动游戏更新所有系统 */
                for (var name_2 in this._systems) {
                    if (!xgame.mgr.DataMgr.isHaveLocalDataCurGame)
                        this._systems[name_2].system.onFirstInitSystem();
                }
            };
            SystemMgr.prototype.onStartUpdate = function () {
                if (this.isUpdate)
                    return;
                this.isUpdate = true;
                /**更新所有系统 */
                for (var name_3 in this._systems) {
                    this._systems[name_3].system.onStartUpdate(Date.now());
                }
            };
            /**
             * 注册所有系统到管理器
             */
            SystemMgr.prototype.registeredSubSystemInfo = function () {
                //xSystem 如果为空表示不存在子系统模块
                if (xSystem && xSystem.sys) {
                    for (var systemName in xSystem.sys) {
                        var systemObj = new xSystem.sys[systemName];
                        var tmpSystemName = systemName.toLowerCase();
                        this._systems[tmpSystemName] = {
                            name: tmpSystemName,
                            system: systemObj
                        };
                    }
                }
                else {
                    xgame.openLog && console.log("[SystemMgr] : \u5B50\u7CFB\u7EDF\u6A21\u5757\u4E0D\u5B58\u5728");
                }
                //注册系统数据对象构造函数到动态数据管理器
                var enumLen = Object.keys(xSystem.EnumSysDataKey).length / 2;
                var curIndex = 0;
                for (var enumKey in xSystem.EnumSysDataKey) {
                    if (curIndex >= enumLen)
                        break;
                    curIndex++;
                    var enumValueName = xSystem.EnumSysDataKey[enumKey];
                    var createFunc = xSysData["create" + xgame.StringTools.UpFirstChat(enumValueName) + "Data"];
                    if (createFunc && typeof createFunc == 'function') {
                        xgame.getXGame().data.registerCreateFunc(parseInt(enumKey), createFunc);
                        xgame.openLog && console.log("[SytemMgr.registeredSubSystemInfo] \u6CE8\u518C\u7CFB\u7EDF\u6570\u636E\u5BF9\u8C61 " + xgame.StringTools.UpFirstChat(enumValueName));
                    }
                    //升级数据处理
                    var levelUpFunc = xSysData["levelUp" + xgame.StringTools.UpFirstChat(enumValueName) + "Data"];
                    if (levelUpFunc && typeof levelUpFunc == 'function') {
                        xgame.getXGame().data.registerDataLevelUpFunc(parseInt(enumKey), levelUpFunc);
                        xgame.openLog && console.log("[SytemMgr.registeredSubSystemInfo] \u6CE8\u518C\u7CFB\u7EDF\u6570\u636E\u5BF9\u8C61\u5347\u7EA7\u51FD\u6570 " + xgame.StringTools.UpFirstChat(enumValueName));
                    }
                }
                /**启动所有系统 */
                for (var sysName in this._systems) {
                    var tmpSystemObj = this._systems[sysName].system;
                    //处理系统消息
                    var registeredInfos = tmpSystemObj.onGetSysRegisters();
                    for (var _i = 0, registeredInfos_1 = registeredInfos; _i < registeredInfos_1.length; _i++) {
                        var registedInfo = registeredInfos_1[_i];
                        this.on(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, tmpSystemObj);
                    }
                }
            };
            /**
             * 重置接口
             */
            SystemMgr.prototype.reset = function () {
            };
            SystemMgr.prototype.onUpdate = function (dt) {
                if (!this.isFinish || !this.isUpdate)
                    return;
                /**更新所有系统 */
                for (var name_4 in this._systems) {
                    this._systems[name_4].system.onUpdate(dt);
                }
            };
            /**
             * 销毁接口
             */
            SystemMgr.prototype.dispose = function () {
                xgame.getXGame().off(xgame.eventKey.xgame_user_init, this.onInitSystem, this);
                xgame.getXGame().off(xgame.eventKey.xgame_game_start, this.onStartUpdate, this);
                for (var name_5 in this._systems) {
                    this._systems[name_5].system.onDestroy();
                    delete this._systems[name_5];
                }
            };
            return SystemMgr;
        }(cc.EventTarget));
        mgr.SystemMgr = SystemMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * UI资源管理器
         */
        var UIAssetsMgr = /** @class */ (function (_super) {
            __extends(UIAssetsMgr, _super);
            function UIAssetsMgr() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIAssetsMgr.prototype.onUpdate = function (dt) {
            };
            UIAssetsMgr.prototype.start = function () {
            };
            UIAssetsMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.isFinish) {
                            console.warn("[SystemMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                            return [2 /*return*/, this.isFinish];
                        }
                        return [2 /*return*/, this.isFinish = true];
                    });
                });
            };
            UIAssetsMgr.loadRes = function (prefabUrl) {
                return __awaiter(this, void 0, void 0, function () {
                    var loadedResource;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xgame.loadRes(prefabUrl, cc.Prefab)];
                            case 1:
                                loadedResource = _a.sent();
                                return [2 /*return*/, loadedResource];
                        }
                    });
                });
            };
            UIAssetsMgr.removeView = function (node) {
                node.destroy();
                cc.loader.releaseRes("" + xgame.mgr.UIMgr.defaultPath + node.name, cc.Prefab);
                cc.loader.releaseResDir("textures/autoResources/" + node.name.toLocaleLowerCase(), cc.SpriteFrame);
                // let prefabUrl = `${xgame.mgr.UIMgr.defaultPath}${node.name}`;
                // let uuids = [
                //     "6a905180-3010-46a8-b904-64689b99f3ef",
                //     "f5981078-77bb-4ff5-a8d4-9c13e75478ff",
                //     "08239367-2517-4e1e-b77a-2101158405db",
                //     "f3f77813-5c3a-42f2-975d-9bb8d8d036ff",
                //     "4003a80e-06a6-47ea-a980-4f1bb2aa133b",
                //     "26384df7-408e-4ce5-8de8-c17939739182",
                //     "21c63689-c65f-4cbc-a0ad-9effdb8d2ce7",
                //     "e3214bba-15ec-43ec-8df5-0058d0fa7524",
                //     "8fefa5cc-84c3-4016-865c-1b2aa3ec5b69",
                //     "0bdccf1d-9a0c-4be2-b8f4-5114d1bbb819",
                //     "d1a07105-63af-473b-aa08-6ffd4ae758f8",
                //     "d41e99ca-f4be-4cd6-a7d2-4c126b78ad1b",
                //     "52d895b8-2d0d-44b8-ae74-4d7c606764f8",
                //     "14cdd936-8b08-456e-af51-4f318304e074",
                //     "e942162a-dcea-430b-9c38-e3836c6d936d",
                //     "87381bab-7116-4e9e-92af-e026c3e3c80f",
                //     "7538ee89-e49a-444a-8b05-4803b9612afc",
                //     "49f14108-566f-4408-a55f-088f8d7a3174",
                // ]
                // let filesDependsMap = {};
                // uuids.map((uuid: string)=>{
                //     let dependsKey = cc.loader["_getReferenceKey"](uuid);
                //     filesDependsMap[dependsKey] = true;
                // })
                // var deps = cc.loader.getDependsRecursively(prefabUrl);
                // deps = deps.filter((dependUuid: string) => {
                //     return filesDependsMap[dependUuid];
                // })
                // cc.loader.release(deps);
                // cc.loader.releaseRes(`${xgame.mgr.UIMgr.defaultPath}${node.name}`, cc.Prefab);
            };
            UIAssetsMgr.prototype.reset = function () {
            };
            UIAssetsMgr.prototype.dispose = function () {
            };
            return UIAssetsMgr;
        }(cc.EventTarget));
        mgr.UIAssetsMgr = UIAssetsMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * view类型
     */
    var EnumViewType;
    (function (EnumViewType) {
        EnumViewType[EnumViewType["Background"] = 0] = "Background";
        EnumViewType[EnumViewType["Layer"] = 1] = "Layer";
        EnumViewType[EnumViewType["UI"] = 2] = "UI";
        EnumViewType[EnumViewType["Board"] = 3] = "Board";
        EnumViewType[EnumViewType["Tips"] = 4] = "Tips";
        EnumViewType[EnumViewType["Dynamic"] = 5] = "Dynamic";
        EnumViewType[EnumViewType["Top"] = 6] = "Top";
        EnumViewType[EnumViewType["System"] = 7] = "System";
        EnumViewType[EnumViewType["Debug"] = 8] = "Debug";
    })(EnumViewType = xgame.EnumViewType || (xgame.EnumViewType = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * UI组件的渲染层级类型
     */
    var EnumBaseUIZIndexType;
    (function (EnumBaseUIZIndexType) {
        EnumBaseUIZIndexType[EnumBaseUIZIndexType["auto"] = 0] = "auto";
        EnumBaseUIZIndexType[EnumBaseUIZIndexType["top"] = 1] = "top"; //最高
    })(EnumBaseUIZIndexType = xgame.EnumBaseUIZIndexType || (xgame.EnumBaseUIZIndexType = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var mgr;
    (function (mgr) {
        /**
         * UI管理器
         */
        var UIMgr = /** @class */ (function (_super) {
            __extends(UIMgr, _super);
            function UIMgr() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**所有UI容器的管理器 */
                _this._uiDict = {};
                _this._blockCount = 0;
                _this._containerHandlerDict = {};
                _this.assetsHandle = null;
                return _this;
            }
            /**
             * 异步初始化
             */
            UIMgr.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this.isFinish) {
                                    console.warn("[UIMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                                    return [2 /*return*/, this.isFinish];
                                }
                                this.assetsHandle = new xgame.UIAssetsHandle();
                                return [4 /*yield*/, this.assetsHandle.init()];
                            case 1:
                                _a.sent();
                                this.initUIContainer();
                                this.initUIContainerHandler();
                                this.reset();
                                return [2 /*return*/, this.isFinish = true];
                        }
                    });
                });
            };
            UIMgr.prototype.start = function () {
            };
            UIMgr.prototype.awaitCanvasInit = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var index;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                index = 0;
                                _a.label = 1;
                            case 1:
                                if (!true) return [3 /*break*/, 3];
                                return [4 /*yield*/, xgame.wait(16)];
                            case 2:
                                _a.sent();
                                if (cc.Canvas.instance != null) {
                                    return [3 /*break*/, 3];
                                }
                                xgame.openLog && console.log("[\u8BFB\u53D6cc.Canvas.instance] ... " + index++ + "\u6B21");
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * 重置（清空所有的View）
             */
            UIMgr.prototype.reset = function () {
                for (var uuid in this._uiDict) {
                    if (this._uiDict.hasOwnProperty(uuid)) {
                        var tmpuuid = this._uiDict[uuid];
                        xgame.destoryNodeChildrens(this._viewRoot.getChildByUuid(tmpuuid));
                    }
                }
                // this._blockTouchLayer.destroy();
                // this._blockCount = 0;
            };
            UIMgr.prototype.onUpdate = function (dt) {
                // let context = cc.sys['__audioSupport'].context;
                // if (context.state === 'suspended') {
                //     context.resume();
                //     xgame.openLog && console.log(context.state);
                // }
            };
            /**
             * 销毁
             */
            UIMgr.prototype.dispose = function () {
                this.reset();
            };
            /**
             * 显示一个View
             * @param prefabUrl 预制体相对路径（不带后缀名）
             */
            UIMgr.prototype.addView = function (prefabUrl, data, addOver) {
                var _this = this;
                if (prefabUrl.indexOf("prefab/ui/") == -1) {
                    console.error("[UIMgr addView] : " + prefabUrl + " UI\u9884\u5236\u4F53\u9700\u8981\u653E\u5230 resource/prefab/ui/ \u8DEF\u5F84\u4E0B");
                    addOver && addOver(null);
                    return;
                }
                //处理预加载资源
                if (data) {
                    if (!data.serialID)
                        data.serialID = xgame.MathTools.getHashCode();
                    else {
                        xgame.openLog && console.warn("[UIMgr.addView] \u663E\u793A\u5BF9\u8C61\u6570\u636E\u7684serialID\u4E0D\u9700\u8981\u63D0\u524D\u8D4B\u503C\uFF0C\u786E\u4FDD\u6570\u636E\u7C7B\u578B\u53EA\u4F5C\u4E3A\u663E\u793A\u754C\u9762\u4F7F\u7528");
                    }
                }
                var viewName = prefabUrl.replace(UIMgr.defaultPath, '');
                var type = xgame.EnumViewType.Background;
                var _viewType = this.getTypeByName(viewName);
                if (_viewType !== null)
                    type = _viewType;
                prefabUrl = this._containerHandlerDict[type].onBeforeAdd(prefabUrl, data);
                if (prefabUrl) {
                    this.retainBlockTouch();
                    xgame.openLog && console.log("[UIMgr.addView] retainBlockTouch:" + prefabUrl + " " + this._blockCount);
                    this._addView(prefabUrl, data, function (uuid) {
                        _this._containerHandlerDict[type].onAdd(uuid, prefabUrl);
                        addOver && addOver(uuid);
                        _this.releaseBlockTouch();
                        xgame.openLog && console.log("[UIMgr.addView] releaseBlockTouch:" + prefabUrl + " " + _this._blockCount);
                    });
                }
                else {
                    addOver && addOver(null);
                }
            };
            /**
             * 显示一个View
             * @param prefabUrl 预制体相对路径（不带后缀名）
             */
            UIMgr.prototype._addView = function (prefabUrl, data, addOver) {
                return __awaiter(this, void 0, void 0, function () {
                    var uiUUID, loadedResource, tmpUINode, keyName, containerUUID, baseCom, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                uiUUID = null;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.assetsHandle.loadRes(prefabUrl)];
                            case 2:
                                loadedResource = _a.sent();
                                //开始实例化预制资源(这是个实例化是我自己理解的，可能说的不正确)
                                if (!loadedResource) {
                                    xgame.isDebug && xgame.openLog && console.log("[UIMgr - addView] - \u6DFB\u52A0View : " + prefabUrl + " \u5931\u8D25,\u65E0\u6CD5\u8BFB\u53D6\u8D44\u6E90");
                                    if (addOver)
                                        addOver(uiUUID);
                                    return [2 /*return*/, uiUUID];
                                }
                                xgame.openLog && console.log("[UIMgr - addView] - \u6DFB\u52A0View \u52A0\u8F7D\u5B8C\u6210 : " + prefabUrl);
                                tmpUINode = cc.instantiate(loadedResource);
                                for (keyName in xgame.EnumViewType) {
                                    if (xgame.EnumViewType.hasOwnProperty(keyName) && isNaN(parseInt(keyName))) {
                                        if (tmpUINode.name.length > keyName.length && tmpUINode.name.substring(0, keyName.length) == keyName) {
                                            containerUUID = this._uiDict[xgame.EnumViewType[keyName]];
                                            baseCom = tmpUINode.getComponent(loadedResource.name);
                                            if (!baseCom) {
                                                console.error("[UIMgr - addView] - \u6DFB\u52A0View\u5931\u8D25 url:" + prefabUrl + " name:" + tmpUINode.name);
                                                break;
                                            }
                                            //处理注册系统事件监听
                                            // this.onAddRegisters(baseCom);
                                            tmpUINode['_xgameUIType'] = xgame.EnumViewType[keyName];
                                            baseCom.showViewData = data;
                                            uiUUID = tmpUINode.uuid;
                                            xgame.openLog && console.log("[UIMgr - addView] - \u6DFB\u52A0\u5230\u6E32\u67D3\u8282\u70B9 : " + tmpUINode.uuid);
                                            /** 如果是动态层对象，加入动态层 */
                                            if (baseCom.isDynamic) {
                                                containerUUID = this._uiDict[xgame.EnumViewType.Dynamic];
                                            }
                                            this._viewRoot.getChildByUuid(containerUUID).addChild(tmpUINode);
                                            this.refreshRanderZIndex(tmpUINode);
                                            break;
                                        }
                                    }
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                return [3 /*break*/, 4];
                            case 4:
                                if (addOver)
                                    addOver(uiUUID);
                                return [2 /*return*/, uiUUID];
                        }
                    });
                });
            };
            UIMgr.prototype.onAddRegisters = function (com) {
                //处理注册系统事件监听
                var registeredInfos = com.onGetRegisters();
                registeredInfos = registeredInfos.concat(com.onGetChildRegisters());
                for (var _i = 0, registeredInfos_2 = registeredInfos; _i < registeredInfos_2.length; _i++) {
                    var registedInfo = registeredInfos_2[_i];
                    this.on(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, registedInfo.target || com);
                }
            };
            /**
             * 使用View的 uuid移除指定view
             * @param uuid view唯一ID
             */
            UIMgr.prototype.removeView = function (uuid) {
                var type = undefined;
                var targetUINode = this._viewRoot.getChildByUuid(this._uiDict[xgame.EnumViewType.Dynamic]).getChildByUuid(uuid);
                if (targetUINode) {
                    type = targetUINode['_xgameUIType'];
                }
                else {
                    for (var key in xgame.EnumViewType) {
                        if (xgame.EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                            var containerUUID = this._uiDict[key];
                            var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                            var targetUINode_1 = tmpContainer.getChildByUuid(uuid);
                            if (targetUINode_1) {
                                type = key;
                                break;
                            }
                        }
                    }
                }
                if (type == undefined)
                    return false;
                this._containerHandlerDict[type].onBeforeRemove(uuid);
                this._removeView(uuid);
                this._containerHandlerDict[type].onRemove(uuid);
                return true;
            };
            /**  */
            UIMgr.prototype.disposeLayer = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var layerContainerHandler, tmpContainer, targetUINode, baseCom;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                layerContainerHandler = this._containerHandlerDict[xgame.EnumViewType.Layer];
                                if (!layerContainerHandler.curUUID) {
                                    return [2 /*return*/];
                                }
                                tmpContainer = this._viewRoot.getChildByUuid(this._uiDict[xgame.EnumViewType.Layer]);
                                targetUINode = tmpContainer.getChildByUuid(layerContainerHandler.curUUID);
                                if (!targetUINode) {
                                    return [2 /*return*/];
                                }
                                baseCom = targetUINode.getComponent(targetUINode.name);
                                //有异步的需求
                                return [4 /*yield*/, baseCom.dispose()];
                            case 1:
                                //有异步的需求
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /** 获取当前的Layer */
            UIMgr.prototype.getLayer = function () {
                var layerContainerHandler = this._containerHandlerDict[xgame.EnumViewType.Layer];
                if (!layerContainerHandler.curUUID) {
                    return;
                }
                var tmpContainer = this._viewRoot.getChildByUuid(this._uiDict[xgame.EnumViewType.Layer]);
                var targetUINode = tmpContainer.getChildByUuid(layerContainerHandler.curUUID);
                if (!targetUINode) {
                    return;
                }
                var baseCom = targetUINode.getComponent(targetUINode.name);
                return baseCom;
            };
            /**
             * 清除指定View类型 只能处理 { board tips }
             * @param type 指定view类型
             */
            UIMgr.prototype.clearBoardAndTips = function () {
                this._clearContainer(xgame.EnumViewType.Board);
                this._clearContainer(xgame.EnumViewType.Tips);
            };
            /**
             * 清除指定容器
             * @param type 指定view类型
             */
            UIMgr.prototype._clearContainer = function (type) {
                this._containerHandlerDict[type].reset();
                var containerUUID = this._uiDict[type];
                var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                var childs = tmpContainer.children;
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    if (child) {
                        this._removeView(child.uuid);
                    }
                }
            };
            /**
             * 获取容器
             * @param type 指定view类型
             */
            UIMgr.prototype.getContainer = function (type) {
                var containerUUID = this._uiDict[type];
                var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                return tmpContainer;
            };
            /**
             * 使用View的 uuid移除指定view
             * @param uuid view唯一ID
             */
            UIMgr.prototype._removeView = function (uuid) {
                for (var key in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                        var containerUUID = this._uiDict[key];
                        var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                        var targetUINode = tmpContainer.getChildByUuid(uuid);
                        if (targetUINode) {
                            var baseCom = targetUINode.getComponent(targetUINode.name);
                            targetUINode.destroy();
                            this.assetsHandle.removeView(targetUINode.name);
                            break;
                        }
                    }
                }
            };
            /**
             * 根据类型获得展示的view
             * @param uuid view唯一ID
             */
            UIMgr.prototype.getViewNamesByType = function (type) {
                var result = [];
                if (xgame.EnumViewType.hasOwnProperty(type) && !isNaN(type)) {
                    var containerUUID = this._uiDict[type];
                    var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                    var childs = tmpContainer.children;
                    for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                        var child = childs_2[_i];
                        result.push(child.name);
                    }
                }
                return result;
            };
            /**
             * 更具名称获得展示的view的数量
             * @param uuid view唯一ID
             */
            UIMgr.prototype.getViewCountByName = function (viewName) {
                var result = 0;
                var type = typeof viewName;
                if (type != "string")
                    viewName = xgame.getQualifiedClassName(viewName);
                var viewType = this.getTypeByName(viewName.toString());
                if (viewType !== null) {
                    var containerUUID = this._uiDict[viewType];
                    var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                    var childs = tmpContainer.children;
                    for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
                        var child = childs_3[_i];
                        if (child.name == viewName)
                            result++;
                    }
                }
                return result;
            };
            UIMgr.prototype.onRemoveRegisters = function (com) {
                //处理注册系统事件监听
                var registeredInfos = com.onGetRegisters();
                registeredInfos = registeredInfos.concat(com.onGetChildRegisters());
                for (var _i = 0, registeredInfos_3 = registeredInfos; _i < registeredInfos_3.length; _i++) {
                    var registedInfo = registeredInfos_3[_i];
                    this.off(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, registedInfo.target || com);
                }
            };
            /**获取指定id的View */
            UIMgr.prototype.getView = function (uuid) {
                var result;
                for (var key in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                        var containerUUID = this._uiDict[key];
                        var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                        var targetUINode = tmpContainer.getChildByUuid(uuid);
                        if (targetUINode) {
                            result = targetUINode.getComponent(targetUINode.name);
                            break;
                        }
                    }
                }
                return result;
            };
            /**
             * 初始化UI布局的容器
             * @param canvas 指定一个canvas
             */
            UIMgr.prototype.initUIContainer = function () {
                if (this._viewRoot != null) {
                    xgame.isDebug && xgame.openLog && console.log("[UIMgr - u initUIContainer] - \u521D\u59CB\u5316\u5931\u8D25\uFF1A_viewRoot \u5DF2\u7ECF\u521D\u59CB\u5316\u8FC7\uFF0C\u4E0D\u9700\u8981\u7EE7\u7EED\u521D\u59CB\u5316");
                    return;
                }
                /** 加入全局渲染层 */
                this._viewRoot = new xgame.UIContainer();
                cc.game.addPersistRootNode(this._viewRoot);
                for (var key in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                        var tmpContainer = new xgame.UIContainer();
                        this._uiDict[key] = tmpContainer.uuid;
                        this._viewRoot.addChild(tmpContainer, parseInt(key), xgame.EnumViewType[key]);
                    }
                }
                /** 加入全局触摸屏蔽层 */
                this._blockTouchLayer = new xgame.UIContainer();
                this._blockTouchLayer.addComponent(cc.BlockInputEvents);
                cc.game.addPersistRootNode(this._blockTouchLayer);
                this._blockCount = 0;
                this.updateBlockTouch();
            };
            /** 添加阻挡 */
            UIMgr.prototype.retainBlockTouch = function () {
                this._blockCount++;
                this.updateBlockTouch();
            };
            /** 释放阻挡 */
            UIMgr.prototype.releaseBlockTouch = function () {
                this._blockCount--;
                this.updateBlockTouch();
            };
            UIMgr.prototype.updateBlockTouch = function () {
                if (this._blockCount > 0)
                    this._blockTouchLayer.active = true;
                else {
                    this._blockTouchLayer.active = false;
                    this._blockCount = 0;
                }
            };
            /**
             * 初始化UI 容器handler
             */
            UIMgr.prototype.initUIContainerHandler = function () {
                for (var key in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(key) && isNaN(parseInt(key))) {
                        var handlerClassObj = xgame.getDefinitionByName("xgame." + key + "ContainerHandler");
                        if (!handlerClassObj)
                            handlerClassObj = xgame.getDefinitionByName("xgame.ContainerHandler");
                        this._containerHandlerDict[xgame.EnumViewType[key]] = new handlerClassObj();
                    }
                }
            };
            UIMgr.prototype.refreshRanderZIndex = function (targetUINode) {
                var baseCom = targetUINode.getComponent(targetUINode.name);
                var maxZIndex = targetUINode.zIndex;
                var tmpContainer = targetUINode.parent;
                if (baseCom.config && baseCom.config.zIndexType == xgame.EnumBaseUIZIndexType.top) {
                    tmpContainer.children.forEach(function (value, index, array) {
                        maxZIndex = maxZIndex < value.zIndex ? value.zIndex : maxZIndex;
                    }, this);
                    targetUINode.zIndex = maxZIndex + 1;
                }
            };
            /**
             * 刷新指定uuid baseUI的渲染顺序
             * @param uuid
             */
            UIMgr.prototype.refreshZIndexByUUID = function (uuid) {
                var tmpContainer = this.getContainerByBaseUIUuid(uuid);
                var targetUINode = tmpContainer.getChildByUuid(uuid);
                if (targetUINode) {
                    this.refreshRanderZIndex(targetUINode);
                }
            };
            /**
             * 获取指定uuid的容器对象
             * @param uuid baseUI的uuid
             */
            UIMgr.prototype.getContainerByBaseUIUuid = function (uuid) {
                for (var key in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                        var containerUUID = this._uiDict[key];
                        var tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                        var targetUINode = tmpContainer.getChildByUuid(uuid);
                        if (targetUINode) {
                            return tmpContainer;
                        }
                    }
                }
                return null;
            };
            /**
             * 更具名字获得类型
             * @param viewName ui名字
             */
            UIMgr.prototype.getTypeByName = function (viewName) {
                var type = null;
                for (var enumValue in xgame.EnumViewType) {
                    if (xgame.EnumViewType.hasOwnProperty(enumValue) && !isNaN(parseInt(enumValue))) {
                        var tmpTypeName = xgame.EnumViewType[enumValue];
                        if (viewName.substring(0, tmpTypeName.length) == tmpTypeName) {
                            type = xgame.EnumViewType[tmpTypeName];
                            break;
                        }
                    }
                }
                return type;
            };
            /**
             * 获得弹出窗口数量
             */
            UIMgr.prototype.getBoardCount = function () {
                return this._containerHandlerDict[xgame.EnumViewType.Board].getActiveCount();
            };
            /**
             * 获得tips提示窗口数量
             */
            UIMgr.prototype.getTipsCount = function () {
                return this._containerHandlerDict[xgame.EnumViewType.Tips].getActiveCount();
            };
            /**
             * 根据类型获得窗口数量
             */
            UIMgr.prototype.getViewCountByType = function (type) {
                return this._containerHandlerDict[type].getActiveCount();
            };
            UIMgr.prototype.hasViewLayer = function () {
                var layerContainer = this._containerHandlerDict[xgame.EnumViewType.Layer];
                return !!(layerContainer.curUUID);
            };
            /**
             * 关闭顶层UI
             * @returns 是否成功返回
             */
            UIMgr.prototype.closeTopLevelView = function () {
                var typeNodes = this._viewRoot.children;
                for (var index = typeNodes.length - 1; index >= 0; index--) {
                    var typeChilds = typeNodes[index].children;
                    for (var indey = typeChilds.length - 1; indey >= 0; indey--) {
                        var viewNode = typeChilds[indey];
                        var baseCom = viewNode.getComponent(viewNode.name);
                        if (baseCom) {
                            if (baseCom.onBack()) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };
            /**默认的资源ui相对路径 */
            UIMgr.defaultPath = "prefab/ui/";
            return UIMgr;
        }(cc.EventTarget));
        mgr.UIMgr = UIMgr;
    })(mgr = xgame.mgr || (xgame.mgr = {}));
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 容器增加删除处理
     * 子类命名格式 className = IContainerHandler.replace('I',EnumViewType[x])
     *  export enum EnumViewType {
     *      Background = 0,
     *      Layer,
     *      Board,
     *      Tips,
     *      System,
     *      Debug
     *  }
     */
    var ContainerHandler = /** @class */ (function () {
        function ContainerHandler() {
        }
        /**
         * 获得在激活使用中的UI数量
         */
        ContainerHandler.prototype.getActiveCount = function () { return 0; };
        ;
        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        ContainerHandler.prototype.onBeforeAdd = function (prefabUrl, data) { return prefabUrl; };
        /**
         * 移除前
         * @param uuid 移除对象的uuid
         */
        ContainerHandler.prototype.onBeforeRemove = function (uuid) { };
        /**
         * 添加完成
         * @param uuid 新对象的uuid
         */
        ContainerHandler.prototype.onAdd = function (uuid, prefabUrl) { };
        /**
         * 移除完成
         * @param uuid 移除对象的uuid
         */
        ContainerHandler.prototype.onRemove = function (uuid) { };
        /**
         * 重置当前控制器
         */
        ContainerHandler.prototype.reset = function () { };
        return ContainerHandler;
    }());
    xgame.ContainerHandler = ContainerHandler;
})(xgame || (xgame = {}));
///<reference path="./ContainerHandler.ts" />
var xgame;
(function (xgame) {
    /**
     * 容器增加删除处理
     */
    var BoardContainerHandler = /** @class */ (function (_super) {
        __extends(BoardContainerHandler, _super);
        function BoardContainerHandler() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addPrefabUrlDict = {};
            _this._showBoardInfo = {};
            return _this;
        }
        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        BoardContainerHandler.prototype.onBeforeAdd = function (prefabUrl, data) {
            if (this._addPrefabUrlDict.hasOwnProperty(prefabUrl)) {
                xgame.openLog && console.error("[LayerContainerHandler onBeforeAdd] : \u540C\u4E00\u4E2A\u754C\u9762\u540C\u65F6\u53EA\u80FD\u52A0\u8F7D\u4E00\u4E2A\uFF0C\u9875\u9762 " + prefabUrl + " \u5728\u52A0\u8F7D\u4E2D,\u9700\u7B49\u5F85\u52A0\u8F7D\u5B8C\u6210\u540E\u518D\u52A0\u8F7D\u65B0\u754C\u9762");
                return null;
            }
            xgame.openLog && console.log("[BoardContainerHandler.onBeforeAdd] " + prefabUrl);
            this._addPrefabUrlDict[prefabUrl] = true;
            return prefabUrl;
        };
        /**
         * 添加完成
         * @param uuid
         * @param prefabUrl
         */
        BoardContainerHandler.prototype.onAdd = function (uuid, prefabUrl) {
            this._showBoardInfo[uuid] = prefabUrl;
        };
        /**
         * 移除完成
         * @param uuid 新对象的uuid
         */
        BoardContainerHandler.prototype.onRemove = function (uuid) {
            var prefabUrl = this._showBoardInfo[uuid];
            delete this._addPrefabUrlDict[prefabUrl];
            if (this.getActiveCount() <= 0)
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.ui_allboard_hide);
        };
        /**
         * 获得在激活使用中的UI数量
         */
        BoardContainerHandler.prototype.getActiveCount = function () {
            return Object.keys(this._addPrefabUrlDict).length;
        };
        return BoardContainerHandler;
    }(xgame.ContainerHandler));
    xgame.BoardContainerHandler = BoardContainerHandler;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 容器增加删除处理
     */
    var LayerContainerHandler = /** @class */ (function (_super) {
        __extends(LayerContainerHandler, _super);
        function LayerContainerHandler() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**当前压栈 */
            _this._layerStack = [];
            /**当前ui的UUID */
            _this._curUUID = undefined;
            _this._curPrefabUrl = undefined;
            _this._isLoading = false;
            _this._loadingPrefabUrl = undefined;
            return _this;
        }
        Object.defineProperty(LayerContainerHandler.prototype, "curUUID", {
            get: function () {
                return this._curUUID;
            },
            enumerable: false,
            configurable: true
        });
        LayerContainerHandler.prototype.reset = function () {
        };
        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        LayerContainerHandler.prototype.onBeforeAdd = function (prefabUrl, data) {
            if (this._isLoading) {
                console.error("[LayerContainerHandler onBeforeAdd] : \u9875\u9762 " + this._loadingPrefabUrl + " \u5728\u52A0\u8F7D\u4E2D,\u9700\u7B49\u5F85\u52A0\u8F7D\u5B8C\u6210\u540E\u518D\u52A0\u8F7D\u65B0\u754C\u9762");
                return null;
            }
            this._loadingPrefabUrl = prefabUrl;
            this._isLoading = true;
            return prefabUrl;
        };
        /**
         * 添加完成
         * @param uuid 新对象的uuid
         */
        LayerContainerHandler.prototype.onAdd = function (uuid, prefabUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var lastUUID, lastPrefabUrl, viewCom;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._isLoading = false;
                            this._loadingPrefabUrl = null;
                            lastUUID = this._curUUID;
                            lastPrefabUrl = this._curPrefabUrl;
                            if (!(lastUUID != null && lastPrefabUrl != null)) return [3 /*break*/, 2];
                            viewCom = xgame.getXGame().ui.getView(lastUUID);
                            if (!viewCom.config.notRecordLayer) {
                                this._layerStack.push({ prefabUrl: lastPrefabUrl, data: viewCom.showViewData });
                            }
                            return [4 /*yield*/, xgame.getXGame().ui.disposeLayer()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this._curUUID = uuid;
                            this._curPrefabUrl = prefabUrl;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 移除完成
         * @param uuid 移除对象的uuid
         */
        LayerContainerHandler.prototype.onRemove = function (uuid) {
            var _this = this;
            if (this._layerStack.length > 0) {
                var viewInfo_1 = this._layerStack[this._layerStack.length - 1];
                xgame.getXGame().ui._addView(viewInfo_1.prefabUrl, viewInfo_1.data, function (uuid) {
                    _this._curUUID = uuid;
                    _this._curPrefabUrl = viewInfo_1.prefabUrl;
                });
                this._layerStack.length = this._layerStack.length - 1;
            }
            if (this._layerStack.length == 0) {
                this._curUUID = undefined;
                this._curPrefabUrl = undefined;
            }
        };
        return LayerContainerHandler;
    }(xgame.ContainerHandler));
    xgame.LayerContainerHandler = LayerContainerHandler;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 容器增加删除处理
     */
    var TipsContainerHandler = /** @class */ (function (_super) {
        __extends(TipsContainerHandler, _super);
        function TipsContainerHandler() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**当前压栈 */
            _this._tipsQueue = [];
            _this._forceCache = false;
            _this._count = 0;
            return _this;
        }
        TipsContainerHandler.prototype.reset = function () {
            this._tipsQueue.length = 0;
            this._count = 0;
            this._forceCache = false;
        };
        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        TipsContainerHandler.prototype.onBeforeAdd = function (prefabUrl, data) {
            if (!this._forceCache && this._count++ == 0) {
                return prefabUrl;
            }
            this._tipsQueue.push({ prefabUrl: prefabUrl, data: data });
            return null;
        };
        /**
         * 移除前
         * @param uuid 移除对象的uuid
         */
        TipsContainerHandler.prototype.onRemove = function (uuid) {
            var _this = this;
            this._count--;
            if (this._tipsQueue.length > 0) {
                var stackData = this._tipsQueue[0];
                this._tipsQueue.splice(0, 1);
                this._forceCache = true;
                xgame.getXGame().ui._addView(stackData.prefabUrl, stackData.data, function (uuid) {
                    _this._forceCache = false;
                });
            }
            if (this.getActiveCount() <= 0)
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.ui_alltips_hide);
        };
        /**
         * 获得在激活使用中的UI数量
         */
        TipsContainerHandler.prototype.getActiveCount = function () {
            return this._count;
        };
        ;
        return TipsContainerHandler;
    }(xgame.ContainerHandler));
    xgame.TipsContainerHandler = TipsContainerHandler;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * UI容器
     */
    var UIContainer = /** @class */ (function (_super) {
        __extends(UIContainer, _super);
        function UIContainer(name) {
            var _this = _super.call(this, name) || this;
            /**处理对其到父节点的尺寸 */
            var widget = _this.addComponent(cc.Widget);
            widget.left = 0;
            widget.right = 0;
            widget.top = 0;
            widget.bottom = 0;
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            return _this;
        }
        return UIContainer;
    }(cc.Node));
    xgame.UIContainer = UIContainer;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var IEnumUIResType;
    (function (IEnumUIResType) {
        IEnumUIResType[IEnumUIResType["prefab"] = 0] = "prefab";
        IEnumUIResType[IEnumUIResType["texture"] = 1] = "texture";
    })(IEnumUIResType = xgame.IEnumUIResType || (xgame.IEnumUIResType = {}));
})(xgame || (xgame = {}));
(function (xgame) {
    /**
     * UI资源管理器
     */
    var UIAssetsHandle = /** @class */ (function () {
        function UIAssetsHandle() {
            this.assetsCfg = null;
        }
        UIAssetsHandle.prototype.onUpdate = function (dt) {
        };
        UIAssetsHandle.prototype.start = function () {
        };
        UIAssetsHandle.prototype.init = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var staticJson;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.isFinish) {
                                console.warn("[SystemMgr - init] : \u4E0D\u9700\u8981\u91CD\u590D\u521D\u59CB\u5316");
                                return [2 /*return*/, this.isFinish];
                            }
                            return [4 /*yield*/, xgame.loadRes('uiResConfig')];
                        case 1:
                            staticJson = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.json;
                            if (staticJson) {
                                this.assetsCfg = staticJson;
                            }
                            else {
                                console.warn("[UIAssetsHandle.init] 找不到UI资源信息配置：uiResConfig.json");
                            }
                            return [2 /*return*/, this.isFinish = true];
                    }
                });
            });
        };
        UIAssetsHandle.prototype.loadRes = function (prefabUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var loadedResource;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, xgame.loadRes(prefabUrl, cc.Prefab)];
                        case 1:
                            loadedResource = _a.sent();
                            return [2 /*return*/, loadedResource];
                    }
                });
            });
        };
        UIAssetsHandle.prototype.removeView = function (nodeName) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var assetsCfg;
                return __generator(this, function (_c) {
                    if (!this.assetsCfg) {
                        return [2 /*return*/];
                    }
                    cc.loader.releaseRes("" + xgame.mgr.UIMgr.defaultPath + nodeName, cc.Prefab);
                    assetsCfg = this.assetsCfg[nodeName.toLocaleLowerCase()];
                    if (!assetsCfg) {
                        console.log("[UIAssetsHandle.removeView] \u627E\u4E0D\u5230 " + nodeName.toLocaleLowerCase() + " \u7684\u8D44\u6E90\u4FE1\u606F\u914D\u7F6E");
                        return [2 /*return*/];
                    }
                    //先释放prefab引用的prefab资源
                    (_a = assetsCfg[xgame.IEnumUIResType.prefab]) === null || _a === void 0 ? void 0 : _a.map(function (uuid) {
                        cc.loader.release(uuid);
                    });
                    //再释放prefab引用的texture资源
                    (_b = assetsCfg[xgame.IEnumUIResType.texture]) === null || _b === void 0 ? void 0 : _b.map(function (uuid) {
                        cc.loader.release(uuid);
                    });
                    return [2 /*return*/];
                });
            });
        };
        UIAssetsHandle.prototype.reset = function () {
        };
        UIAssetsHandle.prototype.dispose = function () {
        };
        return UIAssetsHandle;
    }());
    xgame.UIAssetsHandle = UIAssetsHandle;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 远程资源路径
     */
    xgame.REMOTE_URL = '';
    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    function loadDir(resUrl, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                xgame.openLog && console.log("[xgame.loadDir] : \u52A0\u8F7D : " + resUrl);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var loadOver = function (error, resource, urls) {
                            // xgame.openLog && console.log(`[xgame.loadDir] : loadOver ${resUrl} -> ${JSON.stringify(error)} ${urls}`);
                            if (!error)
                                resolve(resource);
                            else {
                                xgame.openLog && console.error("[xgame.loadDir] : err load " + resUrl + " -> " + JSON.stringify(urls));
                                resolve(null);
                            }
                        };
                        // xgame.openLog && console.log(`[xgame.loadDir] : loadDir加载 ${resUrl}`);
                        var progressCall = function (completedCount, totalCount, item) {
                            // xgame.openLog && console.log(`[xgame.loadDir] : loadDir加载 ${resUrl} progress:${completedCount}/${totalCount}`);
                        };
                        if (type) {
                            cc.loader.loadResDir(resUrl, type, progressCall, loadOver);
                        }
                        else {
                            cc.loader.loadResDir(resUrl, progressCall, loadOver);
                        }
                    })];
            });
        });
    }
    xgame.loadDir = loadDir;
    function loadResWithCount(resUrl, type, count) {
        if (count === void 0) { count = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var result, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < count && !result)) return [3 /*break*/, 4];
                        return [4 /*yield*/, xgame.loadRes(resUrl, type)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    }
    xgame.loadResWithCount = loadResWithCount;
    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    function loadRes(resUrl, type, call) {
        return __awaiter(this, void 0, void 0, function () {
            var resData;
            return __generator(this, function (_a) {
                xgame.openLog && console.log("[xgame.loadRes] : \u52A0\u8F7D : " + resUrl);
                resData = null;
                if (type) {
                    resData = cc.loader.getRes(resUrl, type);
                }
                if (resData) {
                    call && call(resData);
                    return [2 /*return*/, resData];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var loadOver = function (errorMessage, loadedResource) {
                            // xgame.openLog && console.log(`[xgame.loadRes] : loadOver ${resUrl} -> ${JSON.stringify(errorMessage)} ${loadedResource}`);
                            if (!errorMessage) {
                                call && call(loadedResource);
                                resolve(loadedResource);
                            }
                            else {
                                xgame.openLog && console.error("[xgame.loadRes] : err load " + resUrl + " -> " + JSON.stringify(errorMessage));
                                call && call(null);
                                resolve(null);
                            }
                        };
                        // xgame.openLog && console.log(`[xgame.loadRes] : load加载 ${resUrl}`);
                        var progressCall = function (completedCount, totalCount, item) {
                            // xgame.openLog && console.log(`[xgame.loadRes] : load加载 ${resUrl} progress:${completedCount}/${totalCount}`);
                        };
                        if (type) {
                            cc.loader.loadRes(resUrl, type, progressCall, loadOver);
                        }
                        else {
                            cc.loader.loadRes(resUrl, progressCall, loadOver);
                        }
                    })];
            });
        });
    }
    xgame.loadRes = loadRes;
    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    function loadUrl(resUrl, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                xgame.openLog && console.log("[xgame.loadUrl] : \u8FDC\u7A0B\u52A0\u8F7D : " + resUrl);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var loadOver = function (errorMessage, loadedResource) {
                            if (!errorMessage)
                                resolve(loadedResource);
                            else {
                                cc.error(JSON.stringify(errorMessage));
                                resolve(null);
                            }
                        };
                        if (type)
                            cc.loader.load({ url: resUrl, type: type }, loadOver);
                        else
                            cc.loader.load(resUrl, loadOver);
                    })];
            });
        });
    }
    xgame.loadUrl = loadUrl;
    /**
     * 等待指定时间（毫秒）
     * @param time 等待的时间（毫秒）
     */
    function wait(time) {
        if (time === void 0) { time = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(null);
                        }, time);
                    })];
            });
        });
    }
    xgame.wait = wait;
    /**
     * 获取cocos资源的远程路径
     * @param key asset 的名字
     */
    function getAssetRemoteUrl(key) {
        // return new Promise<string>(function (resolve, reject) {
        //     let uuid = cc.loader['_getResUuid'](key, undefined, !0);
        //     cc['AssetLibrary'].queryAssetInfo(uuid, function (a: any, url: string, boolValue: boolean) {
        //         resolve(REMOTE_URL + url);
        //     });
        // });
        return xgame.REMOTE_URL + "/" + key + '.mp3';
    }
    xgame.getAssetRemoteUrl = getAssetRemoteUrl;
    // 震屏效果
    // 参数：duration 震屏时间
    function shakeEffect(duration, shakeY, node) {
        if (shakeY === void 0) { shakeY = 10; }
        if (!node || !node.isValid)
            return;
        if (node.getNumberOfRunningActions() > 0) {
            return;
        }
        var sv = cc.v3(0, shakeY);
        node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (0 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (1 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (2 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (3 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (4 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (5 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (6 * 3) % 8)), cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (7 * 3) % 8)))));
        setTimeout(function () {
            if (node.isValid)
                node.stopAllActions();
            //this.followCom.node.setPosition(0, 0);
        }, duration * 1000);
    }
    xgame.shakeEffect = shakeEffect;
    /**
     * 指定锚点转换到世界坐标系
     * @param node
     * @param anchor
     */
    function convertToWorldSpaceByAR(node, anchor) {
        if (anchor === void 0) { anchor = cc.v2(0, 0); }
        var worldPox = node.convertToWorldSpaceAR(cc.v2(0, 0));
        anchor.x = node.anchorX - anchor.x;
        anchor.y = node.anchorY - anchor.y;
        worldPox.subSelf(cc.v2(node.width * anchor.x, node.height * anchor.y));
        return worldPox;
    }
    xgame.convertToWorldSpaceByAR = convertToWorldSpaceByAR;
    /**
     * 指定锚点转换到节点坐标系
     * @param node
     * @param anchor
     */
    function convertToNodeSpaceByAR(node, worldPos, anchor) {
        if (anchor === void 0) { anchor = cc.v2(0, 0); }
        var nodePos = node.convertToNodeSpaceAR(worldPos);
        anchor.x = node.anchorX - anchor.x;
        anchor.y = node.anchorY - anchor.y;
        nodePos.addSelf(cc.v2(node.width * anchor.x, node.height * anchor.y));
        return nodePos;
    }
    xgame.convertToNodeSpaceByAR = convertToNodeSpaceByAR;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var ColorTools = /** @class */ (function () {
        function ColorTools() {
        }
        /**
     * RGB 颜色值转换为 HSL.
     * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
     * r, g, 和 b 需要在 [0, 255] 范围内
     * 返回的 h, s, 和 l 在 [0, 1] 之间
     *
     * @param   Number  r       红色色值
     * @param   Number  g       绿色色值
     * @param   Number  b       蓝色色值
     * @return  Array           HSL各值数组
     */
        ColorTools.rgbToHsl = function (r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [Math.floor(h * 100), Math.round(s * 100) / 100, Math.round(l * 100) / 100];
        };
        /**
         * HSL颜色值转换为RGB.
         * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
         * h, s, 和 l 设定在 [0, 1] 之间
         * 返回的 r, g, 和 b 在 [0, 255]之间
         *
         * @param   Number  h       色相
         * @param   Number  s       饱和度
         * @param   Number  l       亮度
         * @return  Array           RGB色值数值
         */
        ColorTools.hslToRgb = function (h, s, l) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            }
            else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        };
        /**
         * 提升指定color的亮度
         * @param color
         * @param lightValue // 0 - 1
         */
        ColorTools.upgradeLight = function (color, lightValue) {
            var hsl = this.rgbToHsl(color.r, color.g, color.b);
            // hsl.l = lightValue;
            var newColor = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
            return new cc.Color(newColor[0], newColor[1], newColor[2]);
        };
        return ColorTools;
    }());
    xgame.ColorTools = ColorTools;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    var MathTools = /** @class */ (function () {
        function MathTools() {
        }
        /**
         * 获取hashCode唯一码
         */
        MathTools.getHashCode = function () {
            var curTime = Date.now();
            var index = 0;
            if (MathTools._hashCodeCache.time == curTime) {
                index = MathTools._hashCodeCache.index + 1;
                MathTools._hashCodeCache.index++;
            }
            MathTools._hashCodeCache.time = curTime;
            MathTools._hashCodeCache.index = index;
            return parseInt("" + curTime + index);
        };
        /**
         * 获取随机索引
         * @param arr 随机数组
         */
        MathTools.getRandomIndex = function (arr) {
            return Math.floor(Math.random() * arr.length);
        };
        /**
        * 不重复抽取
        * @param arr 随机数组
        */
        MathTools.getRandomNoRepeat = function (arr, count) {
            var result = [];
            var tempArr = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                tempArr.push(item);
            }
            for (var index = 0; index < tempArr.length && index < count; index++) {
                var randomIndex = Math.floor(Math.random() * (arr.length - index) + index);
                var tmpItem = tempArr[randomIndex];
                result.push(tmpItem);
                var indexItem = tempArr[index];
                tempArr[index] = tmpItem;
                tempArr[randomIndex] = indexItem;
            }
            return result;
        };
        /**
         * 获取数组中随机值
         * @param arr 随机数组
         */
        MathTools.getRandomItem = function (arr) {
            var index = Math.floor(Math.random() * arr.length);
            return arr[index];
        };
        /**
         * 获取对象中随机Key
         * @param arr 随机数组
         */
        MathTools.getRandomValue = function (obj) {
            var keys = Object.keys(obj);
            var index = Math.floor(Math.random() * keys.length);
            var objKey = keys[index];
            return obj[objKey];
        };
        /**
         * 获取a到b的随机值
         * @param arr 随机数组
         */
        MathTools.getRandomBetweenInt = function (a, b) {
            var value = Math.floor(Math.random() * (b - a) + a);
            return value;
        };
        /**
         * 获取a到b的随机值
         * @param arr 随机数组
         */
        MathTools.getRandomBetweenFloat = function (a, b) {
            var value = Math.random() * (b - a) + a;
            return value;
        };
        /**
         * 获取俩数之间的差值
         * @param a 左边界值
         * @param b 右边界值
         * @param ratio 差追比率
         */
        MathTools.lerp = function (a, b, ratio) {
            return (b - a) * ratio + a;
        };
        MathTools.toChinesNum = function (section) {
            var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
            var chnUnitChar = ["", "十", "百", "千"];
            var strIns = '', chnStr = '';
            var unitPos = 0;
            var zero = true;
            while (section > 0) {
                var v = section % 10;
                if (v === 0) {
                    if (!zero) {
                        zero = true;
                        chnStr = chnNumChar[v] + chnStr;
                    }
                }
                else {
                    zero = false;
                    strIns = chnNumChar[v];
                    //十一到十九的特殊处理
                    if (unitPos == 1 && section == 1) {
                        strIns = chnUnitChar[unitPos];
                    }
                    else {
                        strIns += chnUnitChar[unitPos];
                    }
                    chnStr = strIns + chnStr;
                }
                unitPos++;
                section = Math.floor(section / 10);
            }
            return chnStr;
        };
        MathTools.formatNumber = function (value) {
            var unit = ["", "K", "M", "B", "T"];
            if (typeof value !== "number" || value <= 999) {
                return value.toString();
            }
            var index = 0;
            while (value >= 1000) {
                if (index >= unit.length - 1) {
                    break;
                }
                value /= 1000;
                index++;
            }
            // 防止四舍五入大于1000
            if (Number(value.toFixed(1)) >= 1000) {
                if (index < unit.length - 1) {
                    value /= 1000;
                    index++;
                }
            }
            return value.toFixed(1) + unit[index];
        };
        /**
     * 判断上一个时间与当前时间是否不为同一天
     * 返回true为不是同一天
     * @param lastTime 存入的时间
     */
        MathTools.dataCopmareCHEN = function (lastTime) {
            var curTime = new Date();
            var lasTime = new Date();
            lasTime.setTime(lastTime);
            return (curTime.getFullYear() != lasTime.getFullYear() || curTime.getMonth() != lasTime.getMonth() || curTime.getDate() != lasTime.getDate());
        };
        /**
      * 获取传入时间戳下一天零点的时间戳
      * @param currTimestamp 传入时间戳
      */
        MathTools.nextDayTimestamp = function (currTimestamp) {
            var nextDate = new Date(currTimestamp + 24 * 60 * 60 * 1000); //后一天
            return nextDate.setHours(0, 0, 0, 0);
        };
        /**
         * 获取两个时间戳之间相隔的天数
         * 返回true为不是同一天
         * @param lastTime 存入的时间
         */
        MathTools.getDayCountBetweenTime = function (leftTime, rightTime) {
            var left = leftTime;
            var right = rightTime;
            if (typeof (leftTime) == "number") {
                left = new Date(leftTime);
            }
            if (typeof (rightTime) == "number") {
                right = new Date(rightTime);
            }
            left.setHours(0, 0, 0, 0);
            right.setHours(0, 0, 0, 0);
            var result = Math.abs(right.getTime() - left.getTime()) / (1000 * 3600 * 24);
            return result;
        };
        /**
         *获取权重中的内容
         * @param items 权重对象
         */
        MathTools.getWidgetItem = function (items) {
            if (!items || items.length == 0) {
                xgame.openLog && console.warn("[\u6743\u91CD\u8BA1\u7B97\u53C2\u6570\u9519\u8BEF] - \u63D0\u4F9B\u8BA1\u7B97\u8BA1\u7B97\u6743\u91CD\u7684\u5BB9\u5668\u4E3A\u7A7A\uFF01");
                return null;
            }
            var tmpTotalCount = 0;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var tmpWidgetNum = item.widgetNum != null ? item.widgetNum : 1;
                item.widgetNum = tmpWidgetNum;
                tmpTotalCount += tmpWidgetNum;
            }
            var random = Math.floor(Math.random() * Math.floor(tmpTotalCount));
            var curWidgetCount = 0;
            var index = 0;
            for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                var item = items_2[_a];
                curWidgetCount += item.widgetNum;
                if (curWidgetCount > random) {
                    return { item: item.item, index: index };
                }
                index++;
            }
            return { item: items[items.length - 1].item, index: items.length - 1 };
        };
        /**
         *获取权重中的内容
         * @param items 权重对象
         */
        MathTools.getWidgetItemArr = function (items) {
            if (!items || items.length == 0) {
                xgame.openLog && console.warn("[\u6743\u91CD\u8BA1\u7B97\u53C2\u6570\u9519\u8BEF] - \u63D0\u4F9B\u8BA1\u7B97\u8BA1\u7B97\u6743\u91CD\u7684\u5BB9\u5668\u4E3A\u7A7A\uFF01");
                return null;
            }
            var tmpTotalCount = 0;
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var widgetNum = items_3[_i];
                var tmpWidgetNum = (widgetNum !== null && widgetNum !== undefined) ? widgetNum : 0;
                widgetNum = tmpWidgetNum;
                tmpTotalCount += tmpWidgetNum;
            }
            var random = Math.floor(Math.random() * Math.floor(tmpTotalCount));
            var curWidgetCount = 0;
            var index = 0;
            for (var _a = 0, items_4 = items; _a < items_4.length; _a++) {
                var widgetNum = items_4[_a];
                curWidgetCount += widgetNum;
                if (curWidgetCount > random) {
                    return { item: widgetNum, index: index };
                }
                index++;
            }
            return { item: items[items.length - 1], index: items.length - 1 };
        };
        /**
         * 从二维数组中获取权重结果（item = [0], widget = [1]）
         * @param itemsArr
         */
        MathTools.getWidgetItemWithDoubleArr = function (itemsArr) {
            var items = [];
            for (var _i = 0, itemsArr_1 = itemsArr; _i < itemsArr_1.length; _i++) {
                var item = itemsArr_1[_i];
                items.push({ item: item[0], widgetNum: item[1] });
            }
            return this.getWidgetItem(items);
        };
        /**
         * 格式化数字，确定0，6位精确位数
         */
        MathTools.zeroFormat = function (num) {
            if (num >= -0.000001 && num <= 0.000001) {
                return 0;
            }
            return num;
        };
        /**保留numbe小数位数 */
        MathTools.floorNum = function (num, index) {
            if (index === void 0) { index = 6; }
            var p = Math.pow(10, index);
            var result = Math.floor(num * p) / p;
            return result;
        };
        /**保留numbe小数位数 */
        MathTools.roundNum = function (num, index) {
            if (index === void 0) { index = 6; }
            var p = Math.pow(10, index);
            var result = Math.round(num * p) / p;
            return result;
        };
        //获取uuid
        MathTools.getUuid = function () {
            var uuid = "xxxxxxxxcxxxxl4xxxjyxxxdxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
            uuid = xgame.NormalEncypt.encrypt(uuid, 'sjhp');
            var bufferUuid = xgame.Base64Util.string2Uint8Array(uuid);
            uuid = xgame.Base64Util.encode(bufferUuid);
            return uuid;
        };
        MathTools.matchAllNumbers = function (str) {
            var matchStrList = str.match(/[1-9]\d*\.?\d*|0\.\d*[1-9]/g);
            if (!matchStrList || !matchStrList.length) {
                return [];
            }
            var array = matchStrList.map(function (matchStr) { return +matchStr; });
            return array;
        };
        MathTools._hashCodeCache = { time: 0, index: 0 };
        return MathTools;
    }());
    xgame.MathTools = MathTools;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 比较对象是否向相等
     */
    function compare(a, b, exportKeys) {
        if (!a)
            return false;
        for (var key in a) {
            if (exportKeys && exportKeys.hasOwnProperty(key))
                continue;
            if (!b.hasOwnProperty(key) || a[key] != b[key]) {
                return false;
            }
        }
        return true;
    }
    xgame.compare = compare;
    function transRequestParamWithEncode(data) {
        data = data || {};
        var tmpArr = [];
        for (var key in data) {
            tmpArr.push(key + "=" + encodeURIComponent(data[key]));
        }
        return tmpArr.join("&");
    }
    xgame.transRequestParamWithEncode = transRequestParamWithEncode;
    /**
     * 深度拷贝对象
     */
    function deepCopy(src) {
        if (src === null)
            return null;
        if (src === undefined)
            return undefined;
        if (src instanceof Array) {
            var result = [];
            for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
                var value = src_1[_i];
                result.push(deepCopy(value));
            }
            return result;
        }
        else if (typeof src == "object") {
            var result = {};
            for (var key in src) {
                result[key] = deepCopy(src[key]);
            }
            return result;
        }
        else {
            return src;
        }
    }
    xgame.deepCopy = deepCopy;
    /**
     * 修正数据
     * @param 要修正的数据
     * @param 参考数据
     * @param 递归深度
     */
    function fixData(targetObj, fixObj, deepNum) {
        //对象为undefined 直接覆盖对象
        if (targetObj == undefined) {
            return;
        }
        //类型不同放弃修复
        if (typeof targetObj != typeof fixObj) {
            return;
        }
        if (deepNum == undefined)
            deepNum = 0;
        for (var key in fixObj) {
            if (targetObj[key] === undefined) {
                targetObj[key] = fixObj[key];
            }
            else if (typeof targetObj[key] == "object") {
                fixData(targetObj[key], fixObj[key], deepNum + 1);
            }
        }
    }
    xgame.fixData = fixData;
    /**
     * 用新对象覆盖原始对象，保留新对象全部特性
     * @param srcObj 原始对象
     * @param newObj 新对象
     */
    function coverObject(srcObj, newObj) {
        //对象为undefined 直接覆盖对象
        if (srcObj === undefined) {
            srcObj = newObj;
            return;
        }
        //类型不同直接覆盖对象
        if (typeof srcObj != typeof newObj) {
            return;
        }
        for (var key in newObj) {
            if (srcObj[key] === undefined) {
                srcObj[key] = newObj[key];
            }
            else if (typeof srcObj[key] == "object") {
                coverObject(srcObj[key], newObj[key]);
            }
            else {
                srcObj[key] = newObj[key];
            }
        }
        return;
    }
    xgame.coverObject = coverObject;
    /**
     * 清楚对象数据到默认
     */
    function deepSetDefaultValue(src) {
        if (src instanceof Array) {
            var result = [];
            for (var _i = 0, src_2 = src; _i < src_2.length; _i++) {
                var value = src_2[_i];
                result.push(deepSetDefaultValue(value));
            }
            return result;
        }
        else if (typeof src == "object") {
            var result = {};
            for (var key in src) {
                result[key] = deepSetDefaultValue(src[key]);
            }
            return result;
        }
        else if (typeof src == "number") {
            return src = 0;
        }
        else if (typeof src == "string") {
            return src = "";
        }
        else if (typeof src == "boolean") {
            return src = false;
        }
        else {
            return src;
        }
    }
    xgame.deepSetDefaultValue = deepSetDefaultValue;
    function createObj() {
        var tmpData = {};
        var tmpDataA = tmpData;
        return tmpDataA;
    }
    xgame.createObj = createObj;
    function __typeof__(objClass) {
        if (objClass && objClass.constructor) {
            var strFun = objClass.constructor.toString();
            var className = strFun.substr(0, strFun.indexOf('('));
            className = className.replace('function', '');
            return className.replace(/(^\s*)|(\s*$)/g, "");
        }
        return typeof (objClass);
    }
    xgame.__typeof__ = __typeof__;
    /**
     * trace
     * @param [int] [count=10]
     */
    function trace(count) {
        if (count === void 0) { count = 10; }
        var caller = arguments.callee.caller;
        var i = 0;
        count = count || 10;
        while (caller && i < count) {
            xgame.openLog && console.log(caller.toString());
            caller = caller.caller;
            i++;
            xgame.openLog && console.log("***---------------------------------------- ** " + (i + 1));
        }
    }
    xgame.trace = trace;
    /**
     * 随机enum中的一个值
     * @param enumObj
     */
    function randomEnum(enumObj) {
        var keys = Object.keys(enumObj);
        return keys[Math.floor(Math.random() * keys.length / 2)];
    }
    xgame.randomEnum = randomEnum;
    /**
     * 遍历枚举
     * @param enumObj
     */
    function foreachEnum(enumObj, call) {
        for (var enumKey in enumObj) {
            var enumAnyKey = enumKey;
            if (isNaN(enumAnyKey)) {
                call(enumKey, enumObj[enumKey]);
            }
        }
    }
    xgame.foreachEnum = foreachEnum;
})(xgame || (xgame = {}));
var xgame;
(function (xgame) {
    /**
     * 字符串处理工具
     */
    var StringTools = /** @class */ (function () {
        function StringTools() {
        }
        // /**
        //  * 获取目标字符串
        //  * @param  {string} key 对应配置表key
        //  * @param  {any} ...args 要替换的位置字符串
        //  */
        // public static getStr(key: string, ...args) {
        //     if (args.length < 1)
        //         return;
        //     //读取配置表
        //     let returnValue: string = "";
        //     let keyObj = xgame.getXGame().staticDataMgr.easy.GlobalConfigCNTR.getDataByPK(key);
        //     return StringUtils.replaceCustomStr(keyObj.value, ...args);
        // }
        StringTools.replaceCustomStr = function (str, args) {
            if (args === void 0) { args = []; }
            var returnValue = str;
            for (var idx = 0; idx < args.length; idx++) {
                returnValue = returnValue.replace("$" + idx, args[idx].toString());
            }
            return returnValue;
        };
        /**
         * 首字母大写
         */
        StringTools.UpFirstChat = function (srcString) {
            return srcString.substring(0, 1).toUpperCase() + srcString.substring(1);
        };
        /**
         * 首字母小写
         */
        StringTools.lowerFirstChat = function (srcString) {
            return srcString.substring(0, 1).toLowerCase() + srcString.substring(1);
        };
        StringTools.pad = function (num, n) {
            var tmpStr = num + "";
            var len = tmpStr.length;
            while (len < n) {
                tmpStr = "0" + tmpStr;
                len++;
            }
            return tmpStr;
        };
        /**从百分比中获取具体数值 */
        StringTools.getStrNumber = function (strValue, baeeValue) {
            var value = 0;
            if (strValue && strValue.indexOf("%") != -1) {
                value = Number(strValue.replace("%", ""));
                value = baeeValue * value * 0.01;
            }
            else
                value = Number(strValue);
            return value;
        };
        /**
         * 目标字符串是否为空字符串
         * @param {string} value 需要判定的字符串
         * @returns boolean 是否有效字符串
         */
        StringTools.isNullStr = function (value) {
            return !value || value == "";
        };
        /**将秒转换为 00:00:00 */
        StringTools.setSecondToHourString = function (num) {
            var hour = Math.floor(num / 3600);
            var min = Math.floor(num % 3600 / 60);
            var sed = Math.floor(num % 60);
            var hourStr = hour < 10 ? "0" + hour : "" + hour;
            var minStr = min < 10 ? "0" + min : "" + min;
            var sedStr = sed < 10 ? "0" + sed : "" + sed;
            return hourStr + ":" + minStr + ":" + sedStr;
        };
        /**将秒转换为 00:00 */
        StringTools.setSecondToMinString = function (num) {
            var min = Math.floor(num / 60);
            var sed = Math.floor(num % 60);
            var minStr = min < 10 ? "0" + min : "" + min;
            var sedStr = sed < 10 ? "0" + sed : "" + sed;
            return minStr + ":" + sedStr;
        };
        /**
         * 格式化时间戳
         * @param num 秒
         */
        StringTools.formatTimestamp = function (num, maskMin, maskHour) {
            if (maskMin === void 0) { maskMin = false; }
            if (maskHour === void 0) { maskHour = false; }
            var hour = Math.floor(num / 3600);
            var min = Math.floor(num % 3600 / 60);
            var sed = Math.floor(num % 60);
            if (maskHour) {
                min += 60 * hour;
            }
            if (maskMin) {
                sed += 60 * min;
            }
            var hourStr = (hour < 10 ? "0" + hour : "" + hour) + "\u5C0F\u65F6";
            var minStr = (min < 10 ? "0" + min : "" + min) + "\u5206";
            var sedStr = (sed < 10 ? "0" + sed : "" + sed) + "\u79D2";
            var result = sedStr;
            if (!maskMin) {
                result = minStr + result;
            }
            if (!maskHour) {
                result = hourStr + result;
            }
            return result;
        };
        /**
         * 格式化时间戳
         * @param num 秒
         */
        StringTools.formatTimestampWithGet = function (num, getConfig) {
            var result = "";
            if (getConfig.day) {
                var dayNum = Math.floor(num / (3600 * 24 * 1000));
                if (dayNum != 0)
                    result += dayNum + "\u65E5";
                num -= dayNum * 3600 * 24 * 1000;
            }
            if (getConfig.hour) {
                var hourNum = Math.floor(num / (3600 * 1000));
                if (hourNum != 0)
                    result += (hourNum < 10 ? "0" + hourNum : "" + hourNum) + "\u5C0F\u65F6";
                num -= hourNum * 3600 * 1000;
            }
            if (getConfig.min) {
                var minNum = Math.floor(num / (60 * 1000));
                if (minNum != 0)
                    result += (minNum < 10 ? "0" + minNum : "" + minNum) + "\u5206";
                num -= minNum * 60 * 1000;
            }
            if (getConfig.sed) {
                var sedNum = Math.floor(num / (1000));
                if (sedNum != 0)
                    result += (sedNum < 10 ? "0" + sedNum : "" + sedNum) + "\u79D2";
                num -= sedNum * 1000;
            }
            if (getConfig.millised) {
                var millisedNum = num;
                if (millisedNum < 10) {
                    result += "0";
                }
                if (millisedNum < 100) {
                    result += "0";
                }
                result += millisedNum + "\u6BEB\u79D2";
            }
            if (result == "") {
                if (getConfig.millised) {
                    result = "少于1毫秒";
                }
                else if (getConfig.sed) {
                    result = "少于1秒";
                }
                else if (getConfig.min) {
                    result = "少于1分钟";
                }
                else if (getConfig.hour) {
                    result = "少于1小时";
                }
                else if (getConfig.day) {
                    result = "少于1天";
                }
                else {
                    result = "未知";
                }
            }
            return result;
        };
        /**
         * 修正指定位数，前置位缺少0补齐
         * @param value
         * @param count
         */
        StringTools.preZeroFix = function (value, count) {
            var _a = (Array(count).join('0') + value).slice(-count);
            return _a;
        };
        return StringTools;
    }());
    xgame.StringTools = StringTools;
})(xgame || (xgame = {}));
//# sourceMappingURL=xgame.js.map
