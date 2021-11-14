/*
Copyright 2014 Igor Vaynberg

Version: 3.5.4 Timestamp: Sun Aug 30 13:30:32 EDT 2015

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/
!(function (a) {
  "undefined" == typeof a.fn.each2 &&
    a.extend(a.fn, {
      each2: function (b) {
        for (
          var c = a([0]), d = -1, e = this.length;
          ++d < e && (c.context = c[0] = this[d]) && b.call(c[0], d, c) !== !1;

        );
        return this;
      },
    });
})(jQuery),
  (function (a, b) {
    "use strict";
    function n(b) {
      var c = a(document.createTextNode(""));
      b.before(c), c.before(b), c.remove();
    }
    function o(a) {
      function b(a) {
        return m[a] || a;
      }
      return a.replace(/[^\u0000-\u007E]/g, b);
    }
    function p(a, b) {
      for (var c = 0, d = b.length; d > c; c += 1) if (r(a, b[c])) return c;
      return -1;
    }
    function q() {
      var b = a(l);
      b.appendTo(document.body);
      var c = {
        width: b.width() - b[0].clientWidth,
        height: b.height() - b[0].clientHeight,
      };
      return b.remove(), c;
    }
    function r(a, c) {
      return a === c
        ? !0
        : a === b || c === b
        ? !1
        : null === a || null === c
        ? !1
        : a.constructor === String
        ? a + "" == c + ""
        : c.constructor === String
        ? c + "" == a + ""
        : !1;
    }
    function s(a, b, c) {
      var d, e, f;
      if (null === a || a.length < 1) return [];
      for (d = a.split(b), e = 0, f = d.length; f > e; e += 1) d[e] = c(d[e]);
      return d;
    }
    function t(a) {
      return a.outerWidth(!1) - a.width();
    }
    function u(c) {
      var d = "keyup-change-value";
      c.on("keydown", function () {
        a.data(c, d) === b && a.data(c, d, c.val());
      }),
        c.on("keyup", function () {
          var e = a.data(c, d);
          e !== b &&
            c.val() !== e &&
            (a.removeData(c, d), c.trigger("keyup-change"));
        });
    }
    function v(c) {
      c.on("mousemove", function (c) {
        var d = h;
        (d === b || d.x !== c.pageX || d.y !== c.pageY) &&
          a(c.target).trigger("mousemove-filtered", c);
      });
    }
    function w(a, c, d) {
      d = d || b;
      var e;
      return function () {
        var b = arguments;
        window.clearTimeout(e),
          (e = window.setTimeout(function () {
            c.apply(d, b);
          }, a));
      };
    }
    function x(a, b) {
      var c = w(a, function (a) {
        b.trigger("scroll-debounced", a);
      });
      b.on("scroll", function (a) {
        p(a.target, b.get()) >= 0 && c(a);
      });
    }
    function y(a) {
      a[0] !== document.activeElement &&
        window.setTimeout(function () {
          var d,
            b = a[0],
            c = a.val().length;
          a.focus();
          var e = b.offsetWidth > 0 || b.offsetHeight > 0;
          e &&
            b === document.activeElement &&
            (b.setSelectionRange
              ? b.setSelectionRange(c, c)
              : b.createTextRange &&
                ((d = b.createTextRange()), d.collapse(!1), d.select()));
        }, 0);
    }
    function z(b) {
      b = a(b)[0];
      var c = 0,
        d = 0;
      if ("selectionStart" in b)
        (c = b.selectionStart), (d = b.selectionEnd - c);
      else if ("selection" in document) {
        b.focus();
        var e = document.selection.createRange();
        (d = document.selection.createRange().text.length),
          e.moveStart("character", -b.value.length),
          (c = e.text.length - d);
      }
      return { offset: c, length: d };
    }
    function A(a) {
      a.preventDefault(), a.stopPropagation();
    }
    function B(a) {
      a.preventDefault(), a.stopImmediatePropagation();
    }
    function C(b) {
      if (!g) {
        var c = b[0].currentStyle || window.getComputedStyle(b[0], null);
        (g = a(document.createElement("div")).css({
          position: "absolute",
          left: "-10000px",
          top: "-10000px",
          display: "none",
          fontSize: c.fontSize,
          fontFamily: c.fontFamily,
          fontStyle: c.fontStyle,
          fontWeight: c.fontWeight,
          letterSpacing: c.letterSpacing,
          textTransform: c.textTransform,
          whiteSpace: "nowrap",
        })),
          g.attr("class", "select2-sizer"),
          a(document.body).append(g);
      }
      return g.text(b.val()), g.width();
    }
    function D(b, c, d) {
      var e,
        g,
        f = [];
      (e = a.trim(b.attr("class"))),
        e &&
          ((e = "" + e),
          a(e.split(/\s+/)).each2(function () {
            0 === this.indexOf("select2-") && f.push(this);
          })),
        (e = a.trim(c.attr("class"))),
        e &&
          ((e = "" + e),
          a(e.split(/\s+/)).each2(function () {
            0 !== this.indexOf("select2-") && ((g = d(this)), g && f.push(g));
          })),
        b.attr("class", f.join(" "));
    }
    function E(a, b, c, d) {
      var e = o(a.toUpperCase()).indexOf(o(b.toUpperCase())),
        f = b.length;
      return 0 > e
        ? void c.push(d(a))
        : (c.push(d(a.substring(0, e))),
          c.push("<span class='select2-match'>"),
          c.push(d(a.substring(e, e + f))),
          c.push("</span>"),
          void c.push(d(a.substring(e + f, a.length))));
    }
    function F(a) {
      var b = {
        "\\": "&#92;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#47;",
      };
      return String(a).replace(/[&<>"'\/\\]/g, function (a) {
        return b[a];
      });
    }
    function G(c) {
      var d,
        e = null,
        f = c.quietMillis || 100,
        g = c.url,
        h = this;
      return function (i) {
        window.clearTimeout(d),
          (d = window.setTimeout(function () {
            var d = c.data,
              f = g,
              j = c.transport || a.fn.select2.ajaxDefaults.transport,
              k = {
                type: c.type || "GET",
                cache: c.cache || !1,
                jsonpCallback: c.jsonpCallback || b,
                dataType: c.dataType || "json",
              },
              l = a.extend({}, a.fn.select2.ajaxDefaults.params, k);
            (d = d ? d.call(h, i.term, i.page, i.context) : null),
              (f =
                "function" == typeof f
                  ? f.call(h, i.term, i.page, i.context)
                  : f),
              e && "function" == typeof e.abort && e.abort(),
              c.params &&
                (a.isFunction(c.params)
                  ? a.extend(l, c.params.call(h))
                  : a.extend(l, c.params)),
              a.extend(l, {
                url: f,
                dataType: c.dataType,
                data: d,
                success: function (a) {
                  var b = c.results(a, i.page, i);
                  i.callback(b);
                },
                error: function (a, b, c) {
                  var d = {
                    hasError: !0,
                    jqXHR: a,
                    textStatus: b,
                    errorThrown: c,
                  };
                  i.callback(d);
                },
              }),
              (e = j.call(h, l));
          }, f));
      };
    }
    function H(b) {
      var d,
        e,
        c = b,
        f = function (a) {
          return "" + a.text;
        };
      a.isArray(c) && ((e = c), (c = { results: e })),
        a.isFunction(c) === !1 &&
          ((e = c),
          (c = function () {
            return e;
          }));
      var g = c();
      return (
        g.text &&
          ((f = g.text),
          a.isFunction(f) ||
            ((d = g.text),
            (f = function (a) {
              return a[d];
            }))),
        function (b) {
          var g,
            d = b.term,
            e = { results: [] };
          return "" === d
            ? void b.callback(c())
            : ((g = function (c, e) {
                var h, i;
                if (((c = c[0]), c.children)) {
                  h = {};
                  for (i in c) c.hasOwnProperty(i) && (h[i] = c[i]);
                  (h.children = []),
                    a(c.children).each2(function (a, b) {
                      g(b, h.children);
                    }),
                    (h.children.length || b.matcher(d, f(h), c)) && e.push(h);
                } else b.matcher(d, f(c), c) && e.push(c);
              }),
              a(c().results).each2(function (a, b) {
                g(b, e.results);
              }),
              void b.callback(e));
        }
      );
    }
    function I(c) {
      var d = a.isFunction(c);
      return function (e) {
        var f = e.term,
          g = { results: [] },
          h = d ? c(e) : c;
        a.isArray(h) &&
          (a(h).each(function () {
            var a = this.text !== b,
              c = a ? this.text : this;
            ("" === f || e.matcher(f, c)) &&
              g.results.push(a ? this : { id: this, text: this });
          }),
          e.callback(g));
      };
    }
    function J(b, c) {
      if (a.isFunction(b)) return !0;
      if (!b) return !1;
      if ("string" == typeof b) return !0;
      throw new Error(c + " must be a string, function, or falsy value");
    }
    function K(b, c) {
      if (a.isFunction(b)) {
        var d = Array.prototype.slice.call(arguments, 2);
        return b.apply(c, d);
      }
      return b;
    }
    function L(b) {
      var c = 0;
      return (
        a.each(b, function (a, b) {
          b.children ? (c += L(b.children)) : c++;
        }),
        c
      );
    }
    function M(a, c, d, e) {
      var h,
        i,
        j,
        k,
        l,
        f = a,
        g = !1;
      if (
        !e.createSearchChoice ||
        !e.tokenSeparators ||
        e.tokenSeparators.length < 1
      )
        return b;
      for (;;) {
        for (
          i = -1, j = 0, k = e.tokenSeparators.length;
          k > j && ((l = e.tokenSeparators[j]), (i = a.indexOf(l)), !(i >= 0));
          j++
        );
        if (0 > i) break;
        if (
          ((h = a.substring(0, i)),
          (a = a.substring(i + l.length)),
          h.length > 0 &&
            ((h = e.createSearchChoice.call(this, h, c)),
            h !== b && null !== h && e.id(h) !== b && null !== e.id(h)))
        ) {
          for (g = !1, j = 0, k = c.length; k > j; j++)
            if (r(e.id(h), e.id(c[j]))) {
              g = !0;
              break;
            }
          g || d(h);
        }
      }
      return f !== a ? a : void 0;
    }
    function N() {
      var b = this;
      a.each(arguments, function (a, c) {
        b[c].remove(), (b[c] = null);
      });
    }
    function O(b, c) {
      var d = function () {};
      return (
        (d.prototype = new b()),
        (d.prototype.constructor = d),
        (d.prototype.parent = b.prototype),
        (d.prototype = a.extend(d.prototype, c)),
        d
      );
    }
    if (window.Select2 === b) {
      var c,
        d,
        e,
        f,
        g,
        i,
        j,
        h = { x: 0, y: 0 },
        k = {
          TAB: 9,
          ENTER: 13,
          ESC: 27,
          SPACE: 32,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          HOME: 36,
          END: 35,
          BACKSPACE: 8,
          DELETE: 46,
          isArrow: function (a) {
            switch ((a = a.which ? a.which : a)) {
              case k.LEFT:
              case k.RIGHT:
              case k.UP:
              case k.DOWN:
                return !0;
            }
            return !1;
          },
          isControl: function (a) {
            var b = a.which;
            switch (b) {
              case k.SHIFT:
              case k.CTRL:
              case k.ALT:
                return !0;
            }
            return a.metaKey ? !0 : !1;
          },
          isFunctionKey: function (a) {
            return (a = a.which ? a.which : a), a >= 112 && 123 >= a;
          },
        },
        l = "<div class='select2-measure-scrollbar'></div>",
        m = {
          "\u24b6": "A",
          "\uff21": "A",
          "\xc0": "A",
          "\xc1": "A",
          "\xc2": "A",
          "\u1ea6": "A",
          "\u1ea4": "A",
          "\u1eaa": "A",
          "\u1ea8": "A",
          "\xc3": "A",
          "\u0100": "A",
          "\u0102": "A",
          "\u1eb0": "A",
          "\u1eae": "A",
          "\u1eb4": "A",
          "\u1eb2": "A",
          "\u0226": "A",
          "\u01e0": "A",
          "\xc4": "A",
          "\u01de": "A",
          "\u1ea2": "A",
          "\xc5": "A",
          "\u01fa": "A",
          "\u01cd": "A",
          "\u0200": "A",
          "\u0202": "A",
          "\u1ea0": "A",
          "\u1eac": "A",
          "\u1eb6": "A",
          "\u1e00": "A",
          "\u0104": "A",
          "\u023a": "A",
          "\u2c6f": "A",
          "\ua732": "AA",
          "\xc6": "AE",
          "\u01fc": "AE",
          "\u01e2": "AE",
          "\ua734": "AO",
          "\ua736": "AU",
          "\ua738": "AV",
          "\ua73a": "AV",
          "\ua73c": "AY",
          "\u24b7": "B",
          "\uff22": "B",
          "\u1e02": "B",
          "\u1e04": "B",
          "\u1e06": "B",
          "\u0243": "B",
          "\u0182": "B",
          "\u0181": "B",
          "\u24b8": "C",
          "\uff23": "C",
          "\u0106": "C",
          "\u0108": "C",
          "\u010a": "C",
          "\u010c": "C",
          "\xc7": "C",
          "\u1e08": "C",
          "\u0187": "C",
          "\u023b": "C",
          "\ua73e": "C",
          "\u24b9": "D",
          "\uff24": "D",
          "\u1e0a": "D",
          "\u010e": "D",
          "\u1e0c": "D",
          "\u1e10": "D",
          "\u1e12": "D",
          "\u1e0e": "D",
          "\u0110": "D",
          "\u018b": "D",
          "\u018a": "D",
          "\u0189": "D",
          "\ua779": "D",
          "\u01f1": "DZ",
          "\u01c4": "DZ",
          "\u01f2": "Dz",
          "\u01c5": "Dz",
          "\u24ba": "E",
          "\uff25": "E",
          "\xc8": "E",
          "\xc9": "E",
          "\xca": "E",
          "\u1ec0": "E",
          "\u1ebe": "E",
          "\u1ec4": "E",
          "\u1ec2": "E",
          "\u1ebc": "E",
          "\u0112": "E",
          "\u1e14": "E",
          "\u1e16": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\xcb": "E",
          "\u1eba": "E",
          "\u011a": "E",
          "\u0204": "E",
          "\u0206": "E",
          "\u1eb8": "E",
          "\u1ec6": "E",
          "\u0228": "E",
          "\u1e1c": "E",
          "\u0118": "E",
          "\u1e18": "E",
          "\u1e1a": "E",
          "\u0190": "E",
          "\u018e": "E",
          "\u24bb": "F",
          "\uff26": "F",
          "\u1e1e": "F",
          "\u0191": "F",
          "\ua77b": "F",
          "\u24bc": "G",
          "\uff27": "G",
          "\u01f4": "G",
          "\u011c": "G",
          "\u1e20": "G",
          "\u011e": "G",
          "\u0120": "G",
          "\u01e6": "G",
          "\u0122": "G",
          "\u01e4": "G",
          "\u0193": "G",
          "\ua7a0": "G",
          "\ua77d": "G",
          "\ua77e": "G",
          "\u24bd": "H",
          "\uff28": "H",
          "\u0124": "H",
          "\u1e22": "H",
          "\u1e26": "H",
          "\u021e": "H",
          "\u1e24": "H",
          "\u1e28": "H",
          "\u1e2a": "H",
          "\u0126": "H",
          "\u2c67": "H",
          "\u2c75": "H",
          "\ua78d": "H",
          "\u24be": "I",
          "\uff29": "I",
          "\xcc": "I",
          "\xcd": "I",
          "\xce": "I",
          "\u0128": "I",
          "\u012a": "I",
          "\u012c": "I",
          "\u0130": "I",
          "\xcf": "I",
          "\u1e2e": "I",
          "\u1ec8": "I",
          "\u01cf": "I",
          "\u0208": "I",
          "\u020a": "I",
          "\u1eca": "I",
          "\u012e": "I",
          "\u1e2c": "I",
          "\u0197": "I",
          "\u24bf": "J",
          "\uff2a": "J",
          "\u0134": "J",
          "\u0248": "J",
          "\u24c0": "K",
          "\uff2b": "K",
          "\u1e30": "K",
          "\u01e8": "K",
          "\u1e32": "K",
          "\u0136": "K",
          "\u1e34": "K",
          "\u0198": "K",
          "\u2c69": "K",
          "\ua740": "K",
          "\ua742": "K",
          "\ua744": "K",
          "\ua7a2": "K",
          "\u24c1": "L",
          "\uff2c": "L",
          "\u013f": "L",
          "\u0139": "L",
          "\u013d": "L",
          "\u1e36": "L",
          "\u1e38": "L",
          "\u013b": "L",
          "\u1e3c": "L",
          "\u1e3a": "L",
          "\u0141": "L",
          "\u023d": "L",
          "\u2c62": "L",
          "\u2c60": "L",
          "\ua748": "L",
          "\ua746": "L",
          "\ua780": "L",
          "\u01c7": "LJ",
          "\u01c8": "Lj",
          "\u24c2": "M",
          "\uff2d": "M",
          "\u1e3e": "M",
          "\u1e40": "M",
          "\u1e42": "M",
          "\u2c6e": "M",
          "\u019c": "M",
          "\u24c3": "N",
          "\uff2e": "N",
          "\u01f8": "N",
          "\u0143": "N",
          "\xd1": "N",
          "\u1e44": "N",
          "\u0147": "N",
          "\u1e46": "N",
          "\u0145": "N",
          "\u1e4a": "N",
          "\u1e48": "N",
          "\u0220": "N",
          "\u019d": "N",
          "\ua790": "N",
          "\ua7a4": "N",
          "\u01ca": "NJ",
          "\u01cb": "Nj",
          "\u24c4": "O",
          "\uff2f": "O",
          "\xd2": "O",
          "\xd3": "O",
          "\xd4": "O",
          "\u1ed2": "O",
          "\u1ed0": "O",
          "\u1ed6": "O",
          "\u1ed4": "O",
          "\xd5": "O",
          "\u1e4c": "O",
          "\u022c": "O",
          "\u1e4e": "O",
          "\u014c": "O",
          "\u1e50": "O",
          "\u1e52": "O",
          "\u014e": "O",
          "\u022e": "O",
          "\u0230": "O",
          "\xd6": "O",
          "\u022a": "O",
          "\u1ece": "O",
          "\u0150": "O",
          "\u01d1": "O",
          "\u020c": "O",
          "\u020e": "O",
          "\u01a0": "O",
          "\u1edc": "O",
          "\u1eda": "O",
          "\u1ee0": "O",
          "\u1ede": "O",
          "\u1ee2": "O",
          "\u1ecc": "O",
          "\u1ed8": "O",
          "\u01ea": "O",
          "\u01ec": "O",
          "\xd8": "O",
          "\u01fe": "O",
          "\u0186": "O",
          "\u019f": "O",
          "\ua74a": "O",
          "\ua74c": "O",
          "\u01a2": "OI",
          "\ua74e": "OO",
          "\u0222": "OU",
          "\u24c5": "P",
          "\uff30": "P",
          "\u1e54": "P",
          "\u1e56": "P",
          "\u01a4": "P",
          "\u2c63": "P",
          "\ua750": "P",
          "\ua752": "P",
          "\ua754": "P",
          "\u24c6": "Q",
          "\uff31": "Q",
          "\ua756": "Q",
          "\ua758": "Q",
          "\u024a": "Q",
          "\u24c7": "R",
          "\uff32": "R",
          "\u0154": "R",
          "\u1e58": "R",
          "\u0158": "R",
          "\u0210": "R",
          "\u0212": "R",
          "\u1e5a": "R",
          "\u1e5c": "R",
          "\u0156": "R",
          "\u1e5e": "R",
          "\u024c": "R",
          "\u2c64": "R",
          "\ua75a": "R",
          "\ua7a6": "R",
          "\ua782": "R",
          "\u24c8": "S",
          "\uff33": "S",
          "\u1e9e": "S",
          "\u015a": "S",
          "\u1e64": "S",
          "\u015c": "S",
          "\u1e60": "S",
          "\u0160": "S",
          "\u1e66": "S",
          "\u1e62": "S",
          "\u1e68": "S",
          "\u0218": "S",
          "\u015e": "S",
          "\u2c7e": "S",
          "\ua7a8": "S",
          "\ua784": "S",
          "\u24c9": "T",
          "\uff34": "T",
          "\u1e6a": "T",
          "\u0164": "T",
          "\u1e6c": "T",
          "\u021a": "T",
          "\u0162": "T",
          "\u1e70": "T",
          "\u1e6e": "T",
          "\u0166": "T",
          "\u01ac": "T",
          "\u01ae": "T",
          "\u023e": "T",
          "\ua786": "T",
          "\ua728": "TZ",
          "\u24ca": "U",
          "\uff35": "U",
          "\xd9": "U",
          "\xda": "U",
          "\xdb": "U",
          "\u0168": "U",
          "\u1e78": "U",
          "\u016a": "U",
          "\u1e7a": "U",
          "\u016c": "U",
          "\xdc": "U",
          "\u01db": "U",
          "\u01d7": "U",
          "\u01d5": "U",
          "\u01d9": "U",
          "\u1ee6": "U",
          "\u016e": "U",
          "\u0170": "U",
          "\u01d3": "U",
          "\u0214": "U",
          "\u0216": "U",
          "\u01af": "U",
          "\u1eea": "U",
          "\u1ee8": "U",
          "\u1eee": "U",
          "\u1eec": "U",
          "\u1ef0": "U",
          "\u1ee4": "U",
          "\u1e72": "U",
          "\u0172": "U",
          "\u1e76": "U",
          "\u1e74": "U",
          "\u0244": "U",
          "\u24cb": "V",
          "\uff36": "V",
          "\u1e7c": "V",
          "\u1e7e": "V",
          "\u01b2": "V",
          "\ua75e": "V",
          "\u0245": "V",
          "\ua760": "VY",
          "\u24cc": "W",
          "\uff37": "W",
          "\u1e80": "W",
          "\u1e82": "W",
          "\u0174": "W",
          "\u1e86": "W",
          "\u1e84": "W",
          "\u1e88": "W",
          "\u2c72": "W",
          "\u24cd": "X",
          "\uff38": "X",
          "\u1e8a": "X",
          "\u1e8c": "X",
          "\u24ce": "Y",
          "\uff39": "Y",
          "\u1ef2": "Y",
          "\xdd": "Y",
          "\u0176": "Y",
          "\u1ef8": "Y",
          "\u0232": "Y",
          "\u1e8e": "Y",
          "\u0178": "Y",
          "\u1ef6": "Y",
          "\u1ef4": "Y",
          "\u01b3": "Y",
          "\u024e": "Y",
          "\u1efe": "Y",
          "\u24cf": "Z",
          "\uff3a": "Z",
          "\u0179": "Z",
          "\u1e90": "Z",
          "\u017b": "Z",
          "\u017d": "Z",
          "\u1e92": "Z",
          "\u1e94": "Z",
          "\u01b5": "Z",
          "\u0224": "Z",
          "\u2c7f": "Z",
          "\u2c6b": "Z",
          "\ua762": "Z",
          "\u24d0": "a",
          "\uff41": "a",
          "\u1e9a": "a",
          "\xe0": "a",
          "\xe1": "a",
          "\xe2": "a",
          "\u1ea7": "a",
          "\u1ea5": "a",
          "\u1eab": "a",
          "\u1ea9": "a",
          "\xe3": "a",
          "\u0101": "a",
          "\u0103": "a",
          "\u1eb1": "a",
          "\u1eaf": "a",
          "\u1eb5": "a",
          "\u1eb3": "a",
          "\u0227": "a",
          "\u01e1": "a",
          "\xe4": "a",
          "\u01df": "a",
          "\u1ea3": "a",
          "\xe5": "a",
          "\u01fb": "a",
          "\u01ce": "a",
          "\u0201": "a",
          "\u0203": "a",
          "\u1ea1": "a",
          "\u1ead": "a",
          "\u1eb7": "a",
          "\u1e01": "a",
          "\u0105": "a",
          "\u2c65": "a",
          "\u0250": "a",
          "\ua733": "aa",
          "\xe6": "ae",
          "\u01fd": "ae",
          "\u01e3": "ae",
          "\ua735": "ao",
          "\ua737": "au",
          "\ua739": "av",
          "\ua73b": "av",
          "\ua73d": "ay",
          "\u24d1": "b",
          "\uff42": "b",
          "\u1e03": "b",
          "\u1e05": "b",
          "\u1e07": "b",
          "\u0180": "b",
          "\u0183": "b",
          "\u0253": "b",
          "\u24d2": "c",
          "\uff43": "c",
          "\u0107": "c",
          "\u0109": "c",
          "\u010b": "c",
          "\u010d": "c",
          "\xe7": "c",
          "\u1e09": "c",
          "\u0188": "c",
          "\u023c": "c",
          "\ua73f": "c",
          "\u2184": "c",
          "\u24d3": "d",
          "\uff44": "d",
          "\u1e0b": "d",
          "\u010f": "d",
          "\u1e0d": "d",
          "\u1e11": "d",
          "\u1e13": "d",
          "\u1e0f": "d",
          "\u0111": "d",
          "\u018c": "d",
          "\u0256": "d",
          "\u0257": "d",
          "\ua77a": "d",
          "\u01f3": "dz",
          "\u01c6": "dz",
          "\u24d4": "e",
          "\uff45": "e",
          "\xe8": "e",
          "\xe9": "e",
          "\xea": "e",
          "\u1ec1": "e",
          "\u1ebf": "e",
          "\u1ec5": "e",
          "\u1ec3": "e",
          "\u1ebd": "e",
          "\u0113": "e",
          "\u1e15": "e",
          "\u1e17": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\xeb": "e",
          "\u1ebb": "e",
          "\u011b": "e",
          "\u0205": "e",
          "\u0207": "e",
          "\u1eb9": "e",
          "\u1ec7": "e",
          "\u0229": "e",
          "\u1e1d": "e",
          "\u0119": "e",
          "\u1e19": "e",
          "\u1e1b": "e",
          "\u0247": "e",
          "\u025b": "e",
          "\u01dd": "e",
          "\u24d5": "f",
          "\uff46": "f",
          "\u1e1f": "f",
          "\u0192": "f",
          "\ua77c": "f",
          "\u24d6": "g",
          "\uff47": "g",
          "\u01f5": "g",
          "\u011d": "g",
          "\u1e21": "g",
          "\u011f": "g",
          "\u0121": "g",
          "\u01e7": "g",
          "\u0123": "g",
          "\u01e5": "g",
          "\u0260": "g",
          "\ua7a1": "g",
          "\u1d79": "g",
          "\ua77f": "g",
          "\u24d7": "h",
          "\uff48": "h",
          "\u0125": "h",
          "\u1e23": "h",
          "\u1e27": "h",
          "\u021f": "h",
          "\u1e25": "h",
          "\u1e29": "h",
          "\u1e2b": "h",
          "\u1e96": "h",
          "\u0127": "h",
          "\u2c68": "h",
          "\u2c76": "h",
          "\u0265": "h",
          "\u0195": "hv",
          "\u24d8": "i",
          "\uff49": "i",
          "\xec": "i",
          "\xed": "i",
          "\xee": "i",
          "\u0129": "i",
          "\u012b": "i",
          "\u012d": "i",
          "\xef": "i",
          "\u1e2f": "i",
          "\u1ec9": "i",
          "\u01d0": "i",
          "\u0209": "i",
          "\u020b": "i",
          "\u1ecb": "i",
          "\u012f": "i",
          "\u1e2d": "i",
          "\u0268": "i",
          "\u0131": "i",
          "\u24d9": "j",
          "\uff4a": "j",
          "\u0135": "j",
          "\u01f0": "j",
          "\u0249": "j",
          "\u24da": "k",
          "\uff4b": "k",
          "\u1e31": "k",
          "\u01e9": "k",
          "\u1e33": "k",
          "\u0137": "k",
          "\u1e35": "k",
          "\u0199": "k",
          "\u2c6a": "k",
          "\ua741": "k",
          "\ua743": "k",
          "\ua745": "k",
          "\ua7a3": "k",
          "\u24db": "l",
          "\uff4c": "l",
          "\u0140": "l",
          "\u013a": "l",
          "\u013e": "l",
          "\u1e37": "l",
          "\u1e39": "l",
          "\u013c": "l",
          "\u1e3d": "l",
          "\u1e3b": "l",
          "\u017f": "l",
          "\u0142": "l",
          "\u019a": "l",
          "\u026b": "l",
          "\u2c61": "l",
          "\ua749": "l",
          "\ua781": "l",
          "\ua747": "l",
          "\u01c9": "lj",
          "\u24dc": "m",
          "\uff4d": "m",
          "\u1e3f": "m",
          "\u1e41": "m",
          "\u1e43": "m",
          "\u0271": "m",
          "\u026f": "m",
          "\u24dd": "n",
          "\uff4e": "n",
          "\u01f9": "n",
          "\u0144": "n",
          "\xf1": "n",
          "\u1e45": "n",
          "\u0148": "n",
          "\u1e47": "n",
          "\u0146": "n",
          "\u1e4b": "n",
          "\u1e49": "n",
          "\u019e": "n",
          "\u0272": "n",
          "\u0149": "n",
          "\ua791": "n",
          "\ua7a5": "n",
          "\u01cc": "nj",
          "\u24de": "o",
          "\uff4f": "o",
          "\xf2": "o",
          "\xf3": "o",
          "\xf4": "o",
          "\u1ed3": "o",
          "\u1ed1": "o",
          "\u1ed7": "o",
          "\u1ed5": "o",
          "\xf5": "o",
          "\u1e4d": "o",
          "\u022d": "o",
          "\u1e4f": "o",
          "\u014d": "o",
          "\u1e51": "o",
          "\u1e53": "o",
          "\u014f": "o",
          "\u022f": "o",
          "\u0231": "o",
          "\xf6": "o",
          "\u022b": "o",
          "\u1ecf": "o",
          "\u0151": "o",
          "\u01d2": "o",
          "\u020d": "o",
          "\u020f": "o",
          "\u01a1": "o",
          "\u1edd": "o",
          "\u1edb": "o",
          "\u1ee1": "o",
          "\u1edf": "o",
          "\u1ee3": "o",
          "\u1ecd": "o",
          "\u1ed9": "o",
          "\u01eb": "o",
          "\u01ed": "o",
          "\xf8": "o",
          "\u01ff": "o",
          "\u0254": "o",
          "\ua74b": "o",
          "\ua74d": "o",
          "\u0275": "o",
          "\u01a3": "oi",
          "\u0223": "ou",
          "\ua74f": "oo",
          "\u24df": "p",
          "\uff50": "p",
          "\u1e55": "p",
          "\u1e57": "p",
          "\u01a5": "p",
          "\u1d7d": "p",
          "\ua751": "p",
          "\ua753": "p",
          "\ua755": "p",
          "\u24e0": "q",
          "\uff51": "q",
          "\u024b": "q",
          "\ua757": "q",
          "\ua759": "q",
          "\u24e1": "r",
          "\uff52": "r",
          "\u0155": "r",
          "\u1e59": "r",
          "\u0159": "r",
          "\u0211": "r",
          "\u0213": "r",
          "\u1e5b": "r",
          "\u1e5d": "r",
          "\u0157": "r",
          "\u1e5f": "r",
          "\u024d": "r",
          "\u027d": "r",
          "\ua75b": "r",
          "\ua7a7": "r",
          "\ua783": "r",
          "\u24e2": "s",
          "\uff53": "s",
          "\xdf": "s",
          "\u015b": "s",
          "\u1e65": "s",
          "\u015d": "s",
          "\u1e61": "s",
          "\u0161": "s",
          "\u1e67": "s",
          "\u1e63": "s",
          "\u1e69": "s",
          "\u0219": "s",
          "\u015f": "s",
          "\u023f": "s",
          "\ua7a9": "s",
          "\ua785": "s",
          "\u1e9b": "s",
          "\u24e3": "t",
          "\uff54": "t",
          "\u1e6b": "t",
          "\u1e97": "t",
          "\u0165": "t",
          "\u1e6d": "t",
          "\u021b": "t",
          "\u0163": "t",
          "\u1e71": "t",
          "\u1e6f": "t",
          "\u0167": "t",
          "\u01ad": "t",
          "\u0288": "t",
          "\u2c66": "t",
          "\ua787": "t",
          "\ua729": "tz",
          "\u24e4": "u",
          "\uff55": "u",
          "\xf9": "u",
          "\xfa": "u",
          "\xfb": "u",
          "\u0169": "u",
          "\u1e79": "u",
          "\u016b": "u",
          "\u1e7b": "u",
          "\u016d": "u",
          "\xfc": "u",
          "\u01dc": "u",
          "\u01d8": "u",
          "\u01d6": "u",
          "\u01da": "u",
          "\u1ee7": "u",
          "\u016f": "u",
          "\u0171": "u",
          "\u01d4": "u",
          "\u0215": "u",
          "\u0217": "u",
          "\u01b0": "u",
          "\u1eeb": "u",
          "\u1ee9": "u",
          "\u1eef": "u",
          "\u1eed": "u",
          "\u1ef1": "u",
          "\u1ee5": "u",
          "\u1e73": "u",
          "\u0173": "u",
          "\u1e77": "u",
          "\u1e75": "u",
          "\u0289": "u",
          "\u24e5": "v",
          "\uff56": "v",
          "\u1e7d": "v",
          "\u1e7f": "v",
          "\u028b": "v",
          "\ua75f": "v",
          "\u028c": "v",
          "\ua761": "vy",
          "\u24e6": "w",
          "\uff57": "w",
          "\u1e81": "w",
          "\u1e83": "w",
          "\u0175": "w",
          "\u1e87": "w",
          "\u1e85": "w",
          "\u1e98": "w",
          "\u1e89": "w",
          "\u2c73": "w",
          "\u24e7": "x",
          "\uff58": "x",
          "\u1e8b": "x",
          "\u1e8d": "x",
          "\u24e8": "y",
          "\uff59": "y",
          "\u1ef3": "y",
          "\xfd": "y",
          "\u0177": "y",
          "\u1ef9": "y",
          "\u0233": "y",
          "\u1e8f": "y",
          "\xff": "y",
          "\u1ef7": "y",
          "\u1e99": "y",
          "\u1ef5": "y",
          "\u01b4": "y",
          "\u024f": "y",
          "\u1eff": "y",
          "\u24e9": "z",
          "\uff5a": "z",
          "\u017a": "z",
          "\u1e91": "z",
          "\u017c": "z",
          "\u017e": "z",
          "\u1e93": "z",
          "\u1e95": "z",
          "\u01b6": "z",
          "\u0225": "z",
          "\u0240": "z",
          "\u2c6c": "z",
          "\ua763": "z",
          "\u0386": "\u0391",
          "\u0388": "\u0395",
          "\u0389": "\u0397",
          "\u038a": "\u0399",
          "\u03aa": "\u0399",
          "\u038c": "\u039f",
          "\u038e": "\u03a5",
          "\u03ab": "\u03a5",
          "\u038f": "\u03a9",
          "\u03ac": "\u03b1",
          "\u03ad": "\u03b5",
          "\u03ae": "\u03b7",
          "\u03af": "\u03b9",
          "\u03ca": "\u03b9",
          "\u0390": "\u03b9",
          "\u03cc": "\u03bf",
          "\u03cd": "\u03c5",
          "\u03cb": "\u03c5",
          "\u03b0": "\u03c5",
          "\u03c9": "\u03c9",
          "\u03c2": "\u03c3",
        };
      (i = a(document)),
        (f = (function () {
          var a = 1;
          return function () {
            return a++;
          };
        })()),
        (c = O(Object, {
          bind: function (a) {
            var b = this;
            return function () {
              a.apply(b, arguments);
            };
          },
          init: function (c) {
            var d,
              e,
              g = ".select2-results";
            (this.opts = c = this.prepareOpts(c)),
              (this.id = c.id),
              c.element.data("select2") !== b &&
                null !== c.element.data("select2") &&
                c.element.data("select2").destroy(),
              (this.container = this.createContainer()),
              (this.liveRegion = a(".select2-hidden-accessible")),
              0 == this.liveRegion.length &&
                (this.liveRegion = a("<span>", {
                  role: "status",
                  "aria-live": "polite",
                })
                  .addClass("select2-hidden-accessible")
                  .appendTo(document.body)),
              (this.containerId =
                "s2id_" + (c.element.attr("id") || "autogen" + f())),
              (this.containerEventName = this.containerId
                .replace(/([.])/g, "_")
                .replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1")),
              this.container.attr("id", this.containerId),
              this.container.attr("title", c.element.attr("title")),
              (this.body = a(document.body)),
              D(
                this.container,
                this.opts.element,
                this.opts.adaptContainerCssClass
              ),
              this.container.attr("style", c.element.attr("style")),
              this.container.css(K(c.containerCss, this.opts.element)),
              this.container.addClass(
                K(c.containerCssClass, this.opts.element)
              ),
              (this.elementTabIndex = this.opts.element.attr("tabindex")),
              this.opts.element
                .data("select2", this)
                .attr("tabindex", "-1")
                .before(this.container)
                .on("click.select2", A),
              this.container.data("select2", this),
              (this.dropdown = this.container.find(".select2-drop")),
              D(
                this.dropdown,
                this.opts.element,
                this.opts.adaptDropdownCssClass
              ),
              this.dropdown.addClass(K(c.dropdownCssClass, this.opts.element)),
              this.dropdown.data("select2", this),
              this.dropdown.on("click", A),
              (this.results = d = this.container.find(g)),
              (this.search = e = this.container.find("input.select2-input")),
              (this.queryCount = 0),
              (this.resultsPage = 0),
              (this.context = null),
              this.initContainer(),
              this.container.on("click", A),
              v(this.results),
              this.dropdown.on(
                "mousemove-filtered",
                g,
                this.bind(this.highlightUnderEvent)
              ),
              this.dropdown.on(
                "touchstart touchmove touchend",
                g,
                this.bind(function (a) {
                  (this._touchEvent = !0), this.highlightUnderEvent(a);
                })
              ),
              this.dropdown.on("touchmove", g, this.bind(this.touchMoved)),
              this.dropdown.on(
                "touchstart touchend",
                g,
                this.bind(this.clearTouchMoved)
              ),
              this.dropdown.on(
                "click",
                this.bind(function (a) {
                  this._touchEvent &&
                    ((this._touchEvent = !1), this.selectHighlighted());
                })
              ),
              x(80, this.results),
              this.dropdown.on(
                "scroll-debounced",
                g,
                this.bind(this.loadMoreIfNeeded)
              ),
              a(this.container).on("change", ".select2-input", function (a) {
                a.stopPropagation();
              }),
              a(this.dropdown).on("change", ".select2-input", function (a) {
                a.stopPropagation();
              }),
              a.fn.mousewheel &&
                d.mousewheel(function (a, b, c, e) {
                  var f = d.scrollTop();
                  e > 0 && 0 >= f - e
                    ? (d.scrollTop(0), A(a))
                    : 0 > e &&
                      d.get(0).scrollHeight - d.scrollTop() + e <= d.height() &&
                      (d.scrollTop(d.get(0).scrollHeight - d.height()), A(a));
                }),
              u(e),
              e.on("keyup-change input paste", this.bind(this.updateResults)),
              e.on("focus", function () {
                e.addClass("select2-focused");
              }),
              e.on("blur", function () {
                e.removeClass("select2-focused");
              }),
              this.dropdown.on(
                "mouseup",
                g,
                this.bind(function (b) {
                  a(b.target).closest(".select2-result-selectable").length >
                    0 &&
                    (this.highlightUnderEvent(b), this.selectHighlighted(b));
                })
              ),
              this.dropdown.on(
                "click mouseup mousedown touchstart touchend focusin",
                function (a) {
                  a.stopPropagation();
                }
              ),
              (this.lastSearchTerm = b),
              a.isFunction(this.opts.initSelection) &&
                (this.initSelection(), this.monitorSource()),
              null !== c.maximumInputLength &&
                this.search.attr("maxlength", c.maximumInputLength);
            var h = c.element.prop("disabled");
            h === b && (h = !1), this.enable(!h);
            var i = c.element.prop("readonly");
            i === b && (i = !1),
              this.readonly(i),
              (j = j || q()),
              (this.autofocus = c.element.prop("autofocus")),
              c.element.prop("autofocus", !1),
              this.autofocus && this.focus(),
              this.search.attr("placeholder", c.searchInputPlaceholder);
          },
          destroy: function () {
            var a = this.opts.element,
              c = a.data("select2"),
              d = this;
            this.close(),
              a.length &&
                a[0].detachEvent &&
                d._sync &&
                a.each(function () {
                  d._sync && this.detachEvent("onpropertychange", d._sync);
                }),
              this.propertyObserver &&
                (this.propertyObserver.disconnect(),
                (this.propertyObserver = null)),
              (this._sync = null),
              c !== b &&
                (c.container.remove(),
                c.liveRegion.remove(),
                c.dropdown.remove(),
                a.removeData("select2").off(".select2"),
                a.is("input[type='hidden']")
                  ? a.css("display", "")
                  : (a.show().prop("autofocus", this.autofocus || !1),
                    this.elementTabIndex
                      ? a.attr({ tabindex: this.elementTabIndex })
                      : a.removeAttr("tabindex"),
                    a.show())),
              N.call(
                this,
                "container",
                "liveRegion",
                "dropdown",
                "results",
                "search"
              );
          },
          optionToData: function (a) {
            return a.is("option")
              ? {
                  id: a.prop("value"),
                  text: a.text(),
                  element: a.get(),
                  css: a.attr("class"),
                  disabled: a.prop("disabled"),
                  locked:
                    r(a.attr("locked"), "locked") || r(a.data("locked"), !0),
                }
              : a.is("optgroup")
              ? {
                  text: a.attr("label"),
                  children: [],
                  element: a.get(),
                  css: a.attr("class"),
                }
              : void 0;
          },
          prepareOpts: function (c) {
            var d,
              e,
              g,
              h,
              i = this;
            if (
              ((d = c.element),
              "select" === d.get(0).tagName.toLowerCase() &&
                (this.select = e = c.element),
              e &&
                a.each(
                  [
                    "id",
                    "multiple",
                    "ajax",
                    "query",
                    "createSearchChoice",
                    "initSelection",
                    "data",
                    "tags",
                  ],
                  function () {
                    if (this in c)
                      throw new Error(
                        "Option '" +
                          this +
                          "' is not allowed for Select2 when attached to a <select> element."
                      );
                  }
                ),
              (c.debug = c.debug || a.fn.select2.defaults.debug),
              c.debug &&
                console &&
                console.warn &&
                (null != c.id &&
                  console.warn(
                    "Select2: The `id` option has been removed in Select2 4.0.0, consider renaming your `id` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"
                  ),
                null != c.text &&
                  console.warn(
                    "Select2: The `text` option has been removed in Select2 4.0.0, consider renaming your `text` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"
                  ),
                null != c.sortResults &&
                  console.warn(
                    "Select2: the `sortResults` option has been renamed to `sorter` in Select2 4.0.0. "
                  ),
                null != c.selectOnBlur &&
                  console.warn(
                    "Select2: The `selectOnBlur` option has been renamed to `selectOnClose` in Select2 4.0.0."
                  ),
                null != c.ajax &&
                  null != c.ajax.results &&
                  console.warn(
                    "Select2: The `ajax.results` option has been renamed to `ajax.processResults` in Select2 4.0.0."
                  ),
                null != c.formatNoResults &&
                  console.warn(
                    "Select2: The `formatNoResults` option has been renamed to `language.noResults` in Select2 4.0.0."
                  ),
                null != c.formatSearching &&
                  console.warn(
                    "Select2: The `formatSearching` option has been renamed to `language.searching` in Select2 4.0.0."
                  ),
                null != c.formatInputTooShort &&
                  console.warn(
                    "Select2: The `formatInputTooShort` option has been renamed to `language.inputTooShort` in Select2 4.0.0."
                  ),
                null != c.formatInputTooLong &&
                  console.warn(
                    "Select2: The `formatInputTooLong` option has been renamed to `language.inputTooLong` in Select2 4.0.0."
                  ),
                null != c.formatLoading &&
                  console.warn(
                    "Select2: The `formatLoading` option has been renamed to `language.loadingMore` in Select2 4.0.0."
                  ),
                null != c.formatSelectionTooBig &&
                  console.warn(
                    "Select2: The `formatSelectionTooBig` option has been renamed to `language.maximumSelected` in Select2 4.0.0."
                  ),
                c.element.data("select2Tags") &&
                  console.warn(
                    "Select2: The `data-select2-tags` attribute has been renamed to `data-tags` in Select2 4.0.0."
                  )),
              null != c.element.data("tags"))
            ) {
              var j = c.element.data("tags");
              a.isArray(j) || (j = []), c.element.data("select2Tags", j);
            }
            if (
              (null != c.sorter && (c.sortResults = c.sorter),
              null != c.selectOnClose && (c.selectOnBlur = c.selectOnClose),
              null != c.ajax &&
                a.isFunction(c.ajax.processResults) &&
                (c.ajax.results = c.ajax.processResults),
              null != c.language)
            ) {
              var k = c.language;
              a.isFunction(k.noMatches) && (c.formatNoMatches = k.noMatches),
                a.isFunction(k.searching) && (c.formatSearching = k.searching),
                a.isFunction(k.inputTooShort) &&
                  (c.formatInputTooShort = k.inputTooShort),
                a.isFunction(k.inputTooLong) &&
                  (c.formatInputTooLong = k.inputTooLong),
                a.isFunction(k.loadingMore) &&
                  (c.formatLoading = k.loadingMore),
                a.isFunction(k.maximumSelected) &&
                  (c.formatSelectionTooBig = k.maximumSelected);
            }
            if (
              ((c = a.extend(
                {},
                {
                  populateResults: function (d, e, g) {
                    var h,
                      j = this.opts.id,
                      k = this.liveRegion;
                    (h = function (d, e, l) {
                      var m, n, o, p, q, r, s, t, u, v;
                      d = c.sortResults(d, e, g);
                      var w = [];
                      for (m = 0, n = d.length; n > m; m += 1)
                        (o = d[m]),
                          (q = o.disabled === !0),
                          (p = !q && j(o) !== b),
                          (r = o.children && o.children.length > 0),
                          (s = a("<li></li>")),
                          s.addClass("select2-results-dept-" + l),
                          s.addClass("select2-result"),
                          s.addClass(
                            p
                              ? "select2-result-selectable"
                              : "select2-result-unselectable"
                          ),
                          q && s.addClass("select2-disabled"),
                          r && s.addClass("select2-result-with-children"),
                          s.addClass(i.opts.formatResultCssClass(o)),
                          s.attr("role", "presentation"),
                          (t = a(document.createElement("div"))),
                          t.addClass("select2-result-label"),
                          t.attr("id", "select2-result-label-" + f()),
                          t.attr("role", "option"),
                          (v = c.formatResult(o, t, g, i.opts.escapeMarkup)),
                          v !== b && (t.html(v), s.append(t)),
                          r &&
                            ((u = a("<ul></ul>")),
                            u.addClass("select2-result-sub"),
                            h(o.children, u, l + 1),
                            s.append(u)),
                          s.data("select2-data", o),
                          w.push(s[0]);
                      e.append(w), k.text(c.formatMatches(d.length));
                    })(e, d, 0);
                  },
                },
                a.fn.select2.defaults,
                c
              )),
              "function" != typeof c.id &&
                ((g = c.id),
                (c.id = function (a) {
                  return a[g];
                })),
              a.isArray(c.element.data("select2Tags")))
            ) {
              if ("tags" in c)
                throw (
                  "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " +
                  c.element.attr("id")
                );
              c.tags = c.element.data("select2Tags");
            }
            if (
              (e
                ? ((c.query = this.bind(function (a) {
                    var f,
                      g,
                      h,
                      c = { results: [], more: !1 },
                      e = a.term;
                    (h = function (b, c) {
                      var d;
                      b.is("option")
                        ? a.matcher(e, b.text(), b) && c.push(i.optionToData(b))
                        : b.is("optgroup") &&
                          ((d = i.optionToData(b)),
                          b.children().each2(function (a, b) {
                            h(b, d.children);
                          }),
                          d.children.length > 0 && c.push(d));
                    }),
                      (f = d.children()),
                      this.getPlaceholder() !== b &&
                        f.length > 0 &&
                        ((g = this.getPlaceholderOption()),
                        g && (f = f.not(g))),
                      f.each2(function (a, b) {
                        h(b, c.results);
                      }),
                      a.callback(c);
                  })),
                  (c.id = function (a) {
                    return a.id;
                  }))
                : "query" in c ||
                  ("ajax" in c
                    ? ((h = c.element.data("ajax-url")),
                      h && h.length > 0 && (c.ajax.url = h),
                      (c.query = G.call(c.element, c.ajax)))
                    : "data" in c
                    ? (c.query = H(c.data))
                    : "tags" in c &&
                      ((c.query = I(c.tags)),
                      c.createSearchChoice === b &&
                        (c.createSearchChoice = function (b) {
                          return { id: a.trim(b), text: a.trim(b) };
                        }),
                      c.initSelection === b &&
                        (c.initSelection = function (b, d) {
                          var e = [];
                          a(s(b.val(), c.separator, c.transformVal)).each(
                            function () {
                              var b = { id: this, text: this },
                                d = c.tags;
                              a.isFunction(d) && (d = d()),
                                a(d).each(function () {
                                  return r(this.id, b.id)
                                    ? ((b = this), !1)
                                    : void 0;
                                }),
                                e.push(b);
                            }
                          ),
                            d(e);
                        }))),
              "function" != typeof c.query)
            )
              throw (
                "query function not defined for Select2 " + c.element.attr("id")
              );
            if ("top" === c.createSearchChoicePosition)
              c.createSearchChoicePosition = function (a, b) {
                a.unshift(b);
              };
            else if ("bottom" === c.createSearchChoicePosition)
              c.createSearchChoicePosition = function (a, b) {
                a.push(b);
              };
            else if ("function" != typeof c.createSearchChoicePosition)
              throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
            return c;
          },
          monitorSource: function () {
            var d,
              c = this.opts.element,
              e = this;
            c.on(
              "change.select2",
              this.bind(function (a) {
                this.opts.element.data("select2-change-triggered") !== !0 &&
                  this.initSelection();
              })
            ),
              (this._sync = this.bind(function () {
                var a = c.prop("disabled");
                a === b && (a = !1), this.enable(!a);
                var d = c.prop("readonly");
                d === b && (d = !1),
                  this.readonly(d),
                  this.container &&
                    (D(
                      this.container,
                      this.opts.element,
                      this.opts.adaptContainerCssClass
                    ),
                    this.container.addClass(
                      K(this.opts.containerCssClass, this.opts.element)
                    )),
                  this.dropdown &&
                    (D(
                      this.dropdown,
                      this.opts.element,
                      this.opts.adaptDropdownCssClass
                    ),
                    this.dropdown.addClass(
                      K(this.opts.dropdownCssClass, this.opts.element)
                    ));
              })),
              c.length &&
                c[0].attachEvent &&
                c.each(function () {
                  this.attachEvent("onpropertychange", e._sync);
                }),
              (d =
                window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver),
              d !== b &&
                (this.propertyObserver &&
                  (delete this.propertyObserver,
                  (this.propertyObserver = null)),
                (this.propertyObserver = new d(function (b) {
                  a.each(b, e._sync);
                })),
                this.propertyObserver.observe(c.get(0), {
                  attributes: !0,
                  subtree: !1,
                }));
          },
          triggerSelect: function (b) {
            var c = a.Event("select2-selecting", {
              val: this.id(b),
              object: b,
              choice: b,
            });
            return this.opts.element.trigger(c), !c.isDefaultPrevented();
          },
          triggerChange: function (b) {
            (b = b || {}),
              (b = a.extend({}, b, { type: "change", val: this.val() })),
              this.opts.element.data("select2-change-triggered", !0),
              this.opts.element.trigger(b),
              this.opts.element.data("select2-change-triggered", !1),
              this.opts.element.click(),
              this.opts.blurOnChange && this.opts.element.blur();
          },
          isInterfaceEnabled: function () {
            return this.enabledInterface === !0;
          },
          enableInterface: function () {
            var a = this._enabled && !this._readonly,
              b = !a;
            return a === this.enabledInterface
              ? !1
              : (this.container.toggleClass("select2-container-disabled", b),
                this.close(),
                (this.enabledInterface = a),
                !0);
          },
          enable: function (a) {
            a === b && (a = !0),
              this._enabled !== a &&
                ((this._enabled = a),
                this.opts.element.prop("disabled", !a),
                this.enableInterface());
          },
          disable: function () {
            this.enable(!1);
          },
          readonly: function (a) {
            a === b && (a = !1),
              this._readonly !== a &&
                ((this._readonly = a),
                this.opts.element.prop("readonly", a),
                this.enableInterface());
          },
          opened: function () {
            return this.container
              ? this.container.hasClass("select2-dropdown-open")
              : !1;
          },
          positionDropdown: function () {
            var v,
              w,
              x,
              y,
              z,
              b = this.dropdown,
              c = this.container,
              d = c.offset(),
              e = c.outerHeight(!1),
              f = c.outerWidth(!1),
              g = b.outerHeight(!1),
              h = a(window),
              i = h.width(),
              k = h.height(),
              l = h.scrollLeft() + i,
              m = h.scrollTop() + k,
              n = d.top + e,
              o = d.left,
              p = m >= n + g,
              q = d.top - g >= h.scrollTop(),
              r = b.outerWidth(!1),
              s = function () {
                return l >= o + r;
              },
              t = function () {
                return d.left + l + c.outerWidth(!1) > r;
              },
              u = b.hasClass("select2-drop-above");
            u
              ? ((w = !0), !q && p && ((x = !0), (w = !1)))
              : ((w = !1), !p && q && ((x = !0), (w = !0))),
              x &&
                (b.hide(),
                (d = this.container.offset()),
                (e = this.container.outerHeight(!1)),
                (f = this.container.outerWidth(!1)),
                (g = b.outerHeight(!1)),
                (l = h.scrollLeft() + i),
                (m = h.scrollTop() + k),
                (n = d.top + e),
                (o = d.left),
                (r = b.outerWidth(!1)),
                b.show(),
                this.focusSearch()),
              this.opts.dropdownAutoWidth
                ? ((z = a(".select2-results", b)[0]),
                  b.addClass("select2-drop-auto-width"),
                  b.css("width", ""),
                  (r =
                    b.outerWidth(!1) +
                    (z.scrollHeight === z.clientHeight ? 0 : j.width)),
                  r > f ? (f = r) : (r = f),
                  (g = b.outerHeight(!1)))
                : this.container.removeClass("select2-drop-auto-width"),
              "static" !== this.body.css("position") &&
                ((v = this.body.offset()), (n -= v.top), (o -= v.left)),
              !s() && t() && (o = d.left + this.container.outerWidth(!1) - r),
              (y = { left: o, width: f }),
              w
                ? (this.container.addClass("select2-drop-above"),
                  b.addClass("select2-drop-above"),
                  (g = b.outerHeight(!1)),
                  (y.top = d.top - g),
                  (y.bottom = "auto"))
                : ((y.top = n),
                  (y.bottom = "auto"),
                  this.container.removeClass("select2-drop-above"),
                  b.removeClass("select2-drop-above")),
              (y = a.extend(y, K(this.opts.dropdownCss, this.opts.element))),
              b.css(y);
          },
          shouldOpen: function () {
            var b;
            return this.opened()
              ? !1
              : this._enabled === !1 || this._readonly === !0
              ? !1
              : ((b = a.Event("select2-opening")),
                this.opts.element.trigger(b),
                !b.isDefaultPrevented());
          },
          clearDropdownAlignmentPreference: function () {
            this.container.removeClass("select2-drop-above"),
              this.dropdown.removeClass("select2-drop-above");
          },
          open: function () {
            return this.shouldOpen()
              ? (this.opening(),
                i.on("mousemove.select2Event", function (a) {
                  (h.x = a.pageX), (h.y = a.pageY);
                }),
                !0)
              : !1;
          },
          opening: function () {
            var f,
              b = this.containerEventName,
              c = "scroll." + b,
              d = "resize." + b,
              e = "orientationchange." + b;
            this.container
              .addClass("select2-dropdown-open")
              .addClass("select2-container-active"),
              this.clearDropdownAlignmentPreference(),
              this.dropdown[0] !== this.body.children().last()[0] &&
                this.dropdown.detach().appendTo(this.body),
              (f = a("#select2-drop-mask")),
              0 === f.length &&
                ((f = a(document.createElement("div"))),
                f
                  .attr("id", "select2-drop-mask")
                  .attr("class", "select2-drop-mask"),
                f.hide(),
                f.appendTo(this.body),
                f.on("mousedown touchstart click", function (b) {
                  n(f);
                  var d,
                    c = a("#select2-drop");
                  c.length > 0 &&
                    ((d = c.data("select2")),
                    d.opts.selectOnBlur && d.selectHighlighted({ noFocus: !0 }),
                    d.close(),
                    b.preventDefault(),
                    b.stopPropagation());
                })),
              this.dropdown.prev()[0] !== f[0] && this.dropdown.before(f),
              a("#select2-drop").removeAttr("id"),
              this.dropdown.attr("id", "select2-drop"),
              f.show(),
              this.positionDropdown(),
              this.dropdown.show(),
              this.positionDropdown(),
              this.dropdown.addClass("select2-drop-active");
            var g = this;
            this.container
              .parents()
              .add(window)
              .each(function () {
                a(this).on(d + " " + c + " " + e, function (a) {
                  g.opened() && g.positionDropdown();
                });
              });
          },
          close: function () {
            if (this.opened()) {
              var b = this.containerEventName,
                c = "scroll." + b,
                d = "resize." + b,
                e = "orientationchange." + b;
              this.container
                .parents()
                .add(window)
                .each(function () {
                  a(this).off(c).off(d).off(e);
                }),
                this.clearDropdownAlignmentPreference(),
                a("#select2-drop-mask").hide(),
                this.dropdown.removeAttr("id"),
                this.dropdown.hide(),
                this.container
                  .removeClass("select2-dropdown-open")
                  .removeClass("select2-container-active"),
                this.results.empty(),
                i.off("mousemove.select2Event"),
                this.clearSearch(),
                this.search.removeClass("select2-active"),
                this.search.removeAttr("aria-activedescendant"),
                this.opts.element.trigger(a.Event("select2-close"));
            }
          },
          externalSearch: function (a) {
            this.open(), this.search.val(a), this.updateResults(!1);
          },
          clearSearch: function () {},
          prefillNextSearchTerm: function () {
            if ("" !== this.search.val()) return !1;
            var a = this.opts.nextSearchTerm(this.data(), this.lastSearchTerm);
            return a !== b
              ? (this.search.val(a), this.search.select(), !0)
              : !1;
          },
          getMaximumSelectionSize: function () {
            return K(this.opts.maximumSelectionSize, this.opts.element);
          },
          ensureHighlightVisible: function () {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              b = this.results;
            if (((d = this.highlight()), !(0 > d))) {
              if (0 == d) return void b.scrollTop(0);
              (c = this.findHighlightableChoices().find(
                ".select2-result-label"
              )),
                (e = a(c[d])),
                (j = (e.offset() || {}).top || 0),
                (f = j + e.outerHeight(!0)),
                d === c.length - 1 &&
                  ((i = b.find("li.select2-more-results")),
                  i.length > 0 && (f = i.offset().top + i.outerHeight(!0))),
                (g = b.offset().top + b.outerHeight(!1)),
                f > g && b.scrollTop(b.scrollTop() + (f - g)),
                (h = j - b.offset().top),
                0 > h &&
                  "none" != e.css("display") &&
                  b.scrollTop(b.scrollTop() + h);
            }
          },
          findHighlightableChoices: function () {
            return this.results.find(
              ".select2-result-selectable:not(.select2-disabled):not(.select2-selected)"
            );
          },
          moveHighlight: function (b) {
            for (
              var c = this.findHighlightableChoices(), d = this.highlight();
              d > -1 && d < c.length;

            ) {
              d += b;
              var e = a(c[d]);
              if (
                e.hasClass("select2-result-selectable") &&
                !e.hasClass("select2-disabled") &&
                !e.hasClass("select2-selected")
              ) {
                this.highlight(d);
                break;
              }
            }
          },
          highlight: function (b) {
            var d,
              e,
              c = this.findHighlightableChoices();
            return 0 === arguments.length
              ? p(c.filter(".select2-highlighted")[0], c.get())
              : (b >= c.length && (b = c.length - 1),
                0 > b && (b = 0),
                this.removeHighlight(),
                (d = a(c[b])),
                d.addClass("select2-highlighted"),
                this.search.attr(
                  "aria-activedescendant",
                  d.find(".select2-result-label").attr("id")
                ),
                this.ensureHighlightVisible(),
                this.liveRegion.text(d.text()),
                (e = d.data("select2-data")),
                void (
                  e &&
                  this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(e),
                    choice: e,
                  })
                ));
          },
          removeHighlight: function () {
            this.results
              .find(".select2-highlighted")
              .removeClass("select2-highlighted");
          },
          touchMoved: function () {
            this._touchMoved = !0;
          },
          clearTouchMoved: function () {
            this._touchMoved = !1;
          },
          countSelectableResults: function () {
            return this.findHighlightableChoices().length;
          },
          highlightUnderEvent: function (b) {
            var c = a(b.target).closest(".select2-result-selectable");
            if (c.length > 0 && !c.is(".select2-highlighted")) {
              var d = this.findHighlightableChoices();
              this.highlight(d.index(c));
            } else 0 == c.length && this.removeHighlight();
          },
          loadMoreIfNeeded: function () {
            var c,
              a = this.results,
              b = a.find("li.select2-more-results"),
              d = this.resultsPage + 1,
              e = this,
              f = this.search.val(),
              g = this.context;
            0 !== b.length &&
              ((c = b.offset().top - a.offset().top - a.height()),
              c <= this.opts.loadMorePadding &&
                (b.addClass("select2-active"),
                this.opts.query({
                  element: this.opts.element,
                  term: f,
                  page: d,
                  context: g,
                  matcher: this.opts.matcher,
                  callback: this.bind(function (c) {
                    e.opened() &&
                      (e.opts.populateResults.call(this, a, c.results, {
                        term: f,
                        page: d,
                        context: g,
                      }),
                      e.postprocessResults(c, !1, !1),
                      c.more === !0
                        ? (b
                            .detach()
                            .appendTo(a)
                            .html(
                              e.opts.escapeMarkup(
                                K(e.opts.formatLoadMore, e.opts.element, d + 1)
                              )
                            ),
                          window.setTimeout(function () {
                            e.loadMoreIfNeeded();
                          }, 10))
                        : b.remove(),
                      e.positionDropdown(),
                      (e.resultsPage = d),
                      (e.context = c.context),
                      this.opts.element.trigger({
                        type: "select2-loaded",
                        items: c,
                      }));
                  }),
                })));
          },
          tokenize: function () {},
          updateResults: function (c) {
            function m() {
              d.removeClass("select2-active"),
                h.positionDropdown(),
                e.find(
                  ".select2-no-results,.select2-selection-limit,.select2-searching"
                ).length
                  ? h.liveRegion.text(e.text())
                  : h.liveRegion.text(
                      h.opts.formatMatches(
                        e.find(
                          '.select2-result-selectable:not(".select2-selected")'
                        ).length
                      )
                    );
            }
            function n(a) {
              e.html(a), m();
            }
            var g,
              i,
              l,
              d = this.search,
              e = this.results,
              f = this.opts,
              h = this,
              j = d.val(),
              k = a.data(this.container, "select2-last-term");
            if (
              (c === !0 || !k || !r(j, k)) &&
              (a.data(this.container, "select2-last-term", j),
              c === !0 || (this.showSearchInput !== !1 && this.opened()))
            ) {
              l = ++this.queryCount;
              var o = this.getMaximumSelectionSize();
              if (
                o >= 1 &&
                ((g = this.data()),
                a.isArray(g) &&
                  g.length >= o &&
                  J(f.formatSelectionTooBig, "formatSelectionTooBig"))
              )
                return void n(
                  "<li class='select2-selection-limit'>" +
                    K(f.formatSelectionTooBig, f.element, o) +
                    "</li>"
                );
              if (d.val().length < f.minimumInputLength)
                return (
                  n(
                    J(f.formatInputTooShort, "formatInputTooShort")
                      ? "<li class='select2-no-results'>" +
                          K(
                            f.formatInputTooShort,
                            f.element,
                            d.val(),
                            f.minimumInputLength
                          ) +
                          "</li>"
                      : ""
                  ),
                  void (c && this.showSearch && this.showSearch(!0))
                );
              if (f.maximumInputLength && d.val().length > f.maximumInputLength)
                return void n(
                  J(f.formatInputTooLong, "formatInputTooLong")
                    ? "<li class='select2-no-results'>" +
                        K(
                          f.formatInputTooLong,
                          f.element,
                          d.val(),
                          f.maximumInputLength
                        ) +
                        "</li>"
                    : ""
                );
              f.formatSearching &&
                0 === this.findHighlightableChoices().length &&
                n(
                  "<li class='select2-searching'>" +
                    K(f.formatSearching, f.element) +
                    "</li>"
                ),
                d.addClass("select2-active"),
                this.removeHighlight(),
                (i = this.tokenize()),
                i != b && null != i && d.val(i),
                (this.resultsPage = 1),
                f.query({
                  element: f.element,
                  term: d.val(),
                  page: this.resultsPage,
                  context: null,
                  matcher: f.matcher,
                  callback: this.bind(function (g) {
                    var i;
                    if (l == this.queryCount) {
                      if (!this.opened())
                        return void this.search.removeClass("select2-active");
                      if (
                        g.hasError !== b &&
                        J(f.formatAjaxError, "formatAjaxError")
                      )
                        return void n(
                          "<li class='select2-ajax-error'>" +
                            K(
                              f.formatAjaxError,
                              f.element,
                              g.jqXHR,
                              g.textStatus,
                              g.errorThrown
                            ) +
                            "</li>"
                        );
                      if (
                        ((this.context = g.context === b ? null : g.context),
                        this.opts.createSearchChoice &&
                          "" !== d.val() &&
                          ((i = this.opts.createSearchChoice.call(
                            h,
                            d.val(),
                            g.results
                          )),
                          i !== b &&
                            null !== i &&
                            h.id(i) !== b &&
                            null !== h.id(i) &&
                            0 ===
                              a(g.results).filter(function () {
                                return r(h.id(this), h.id(i));
                              }).length &&
                            this.opts.createSearchChoicePosition(g.results, i)),
                        0 === g.results.length &&
                          J(f.formatNoMatches, "formatNoMatches"))
                      )
                        return (
                          n(
                            "<li class='select2-no-results'>" +
                              K(f.formatNoMatches, f.element, d.val()) +
                              "</li>"
                          ),
                          void (this.showSearch && this.showSearch(d.val()))
                        );
                      e.empty(),
                        h.opts.populateResults.call(this, e, g.results, {
                          term: d.val(),
                          page: this.resultsPage,
                          context: null,
                        }),
                        g.more === !0 &&
                          J(f.formatLoadMore, "formatLoadMore") &&
                          (e.append(
                            "<li class='select2-more-results'>" +
                              f.escapeMarkup(
                                K(f.formatLoadMore, f.element, this.resultsPage)
                              ) +
                              "</li>"
                          ),
                          window.setTimeout(function () {
                            h.loadMoreIfNeeded();
                          }, 10)),
                        this.postprocessResults(g, c),
                        m(),
                        this.opts.element.trigger({
                          type: "select2-loaded",
                          items: g,
                        });
                    }
                  }),
                });
            }
          },
          cancel: function () {
            this.close();
          },
          blur: function () {
            this.opts.selectOnBlur && this.selectHighlighted({ noFocus: !0 }),
              this.close(),
              this.container.removeClass("select2-container-active"),
              this.search[0] === document.activeElement && this.search.blur(),
              this.clearSearch(),
              this.selection
                .find(".select2-search-choice-focus")
                .removeClass("select2-search-choice-focus");
          },
          focusSearch: function () {
            y(this.search);
          },
          selectHighlighted: function (a) {
            if (this._touchMoved) return void this.clearTouchMoved();
            var b = this.highlight(),
              c = this.results.find(".select2-highlighted"),
              d = c.closest(".select2-result").data("select2-data");
            d
              ? (this.highlight(b), this.onSelect(d, a))
              : a && a.noFocus && this.close();
          },
          getPlaceholder: function () {
            var a;
            return (
              this.opts.element.attr("placeholder") ||
              this.opts.element.attr("data-placeholder") ||
              this.opts.element.data("placeholder") ||
              this.opts.placeholder ||
              ((a = this.getPlaceholderOption()) !== b ? a.text() : b)
            );
          },
          getPlaceholderOption: function () {
            if (this.select) {
              var c = this.select.children("option").first();
              if (this.opts.placeholderOption !== b)
                return (
                  ("first" === this.opts.placeholderOption && c) ||
                  ("function" == typeof this.opts.placeholderOption &&
                    this.opts.placeholderOption(this.select))
                );
              if ("" === a.trim(c.text()) && "" === c.val()) return c;
            }
          },
          initContainerWidth: function () {
            function b() {
              var b, c, d, e, f, g;
              if ("off" === this.opts.width) return null;
              if ("element" === this.opts.width)
                return 0 === this.opts.element.outerWidth(!1)
                  ? "auto"
                  : this.opts.element.outerWidth(!1) + "px";
              if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                if (
                  ((b = this.opts.element.attr("style")), "string" == typeof b)
                )
                  for (c = b.split(";"), e = 0, f = c.length; f > e; e += 1)
                    if (
                      ((g = c[e].replace(/\s/g, "")),
                      (d = g.match(
                        /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i
                      )),
                      null !== d && d.length >= 1)
                    )
                      return d[1];
                return "resolve" === this.opts.width
                  ? ((b = this.opts.element.css("width")),
                    b.indexOf("%") > 0
                      ? b
                      : 0 === this.opts.element.outerWidth(!1)
                      ? "auto"
                      : this.opts.element.outerWidth(!1) + "px")
                  : null;
              }
              return a.isFunction(this.opts.width)
                ? this.opts.width()
                : this.opts.width;
            }
            var c = b.call(this);
            null !== c && this.container.css("width", c);
          },
        })),
        (d = O(c, {
          createContainer: function () {
            var b = a(document.createElement("div"))
              .attr({ class: "select2-container" })
              .html(
                [
                  "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>",
                  "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>",
                  "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",
                  "</a>",
                  "<label for='' class='select2-offscreen'></label>",
                  "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />",
                  "<div class='select2-drop select2-display-none'>",
                  "   <div class='select2-search'>",
                  "       <label for='' class='select2-offscreen'></label>",
                  "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
                  "       aria-autocomplete='list' />",
                  "   </div>",
                  "   <ul class='select2-results' role='listbox'>",
                  "   </ul>",
                  "</div>",
                ].join("")
              );
            return b;
          },
          enableInterface: function () {
            this.parent.enableInterface.apply(this, arguments) &&
              this.focusser.prop("disabled", !this.isInterfaceEnabled());
          },
          opening: function () {
            var b, c, d;
            this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0),
              this.parent.opening.apply(this, arguments),
              this.showSearchInput !== !1 &&
                this.search.val(this.focusser.val()),
              this.opts.shouldFocusInput(this) &&
                (this.search.focus(),
                (b = this.search.get(0)),
                b.createTextRange
                  ? ((c = b.createTextRange()), c.collapse(!1), c.select())
                  : b.setSelectionRange &&
                    ((d = this.search.val().length),
                    b.setSelectionRange(d, d))),
              this.prefillNextSearchTerm(),
              this.focusser.prop("disabled", !0).val(""),
              this.updateResults(!0),
              this.opts.element.trigger(a.Event("select2-open"));
          },
          close: function () {
            this.opened() &&
              (this.parent.close.apply(this, arguments),
              this.focusser.prop("disabled", !1),
              this.opts.shouldFocusInput(this) && this.focusser.focus());
          },
          focus: function () {
            this.opened()
              ? this.close()
              : (this.focusser.prop("disabled", !1),
                this.opts.shouldFocusInput(this) && this.focusser.focus());
          },
          isFocused: function () {
            return this.container.hasClass("select2-container-active");
          },
          cancel: function () {
            this.parent.cancel.apply(this, arguments),
              this.focusser.prop("disabled", !1),
              this.opts.shouldFocusInput(this) && this.focusser.focus();
          },
          destroy: function () {
            a("label[for='" + this.focusser.attr("id") + "']").attr(
              "for",
              this.opts.element.attr("id")
            ),
              this.parent.destroy.apply(this, arguments),
              N.call(this, "selection", "focusser");
          },
          initContainer: function () {
            var b,
              g,
              c = this.container,
              d = this.dropdown,
              e = f();
            this.opts.minimumResultsForSearch < 0
              ? this.showSearch(!1)
              : this.showSearch(!0),
              (this.selection = b = c.find(".select2-choice")),
              (this.focusser = c.find(".select2-focusser")),
              b.find(".select2-chosen").attr("id", "select2-chosen-" + e),
              this.focusser.attr("aria-labelledby", "select2-chosen-" + e),
              this.results.attr("id", "select2-results-" + e),
              this.search.attr("aria-owns", "select2-results-" + e),
              this.focusser.attr("id", "s2id_autogen" + e),
              (g = a("label[for='" + this.opts.element.attr("id") + "']")),
              this.opts.element.on(
                "focus.select2",
                this.bind(function () {
                  this.focus();
                })
              ),
              this.focusser
                .prev()
                .text(g.text())
                .attr("for", this.focusser.attr("id"));
            var h = this.opts.element.attr("title");
            this.opts.element.attr("title", h || g.text()),
              this.focusser.attr("tabindex", this.elementTabIndex),
              this.search.attr("id", this.focusser.attr("id") + "_search"),
              this.search
                .prev()
                .text(a("label[for='" + this.focusser.attr("id") + "']").text())
                .attr("for", this.search.attr("id")),
              this.search.on(
                "keydown",
                this.bind(function (a) {
                  if (this.isInterfaceEnabled() && 229 != a.keyCode) {
                    if (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN)
                      return void A(a);
                    switch (a.which) {
                      case k.UP:
                      case k.DOWN:
                        return (
                          this.moveHighlight(a.which === k.UP ? -1 : 1),
                          void A(a)
                        );
                      case k.ENTER:
                        return this.selectHighlighted(), void A(a);
                      case k.TAB:
                        return void this.selectHighlighted({ noFocus: !0 });
                      case k.ESC:
                        return this.cancel(a), void A(a);
                    }
                  }
                })
              ),
              this.search.on(
                "blur",
                this.bind(function (a) {
                  document.activeElement === this.body.get(0) &&
                    window.setTimeout(
                      this.bind(function () {
                        this.opened() &&
                          this.results &&
                          this.results.length > 1 &&
                          this.search.focus();
                      }),
                      0
                    );
                })
              ),
              this.focusser.on(
                "keydown",
                this.bind(function (a) {
                  if (
                    this.isInterfaceEnabled() &&
                    a.which !== k.TAB &&
                    !k.isControl(a) &&
                    !k.isFunctionKey(a) &&
                    a.which !== k.ESC
                  ) {
                    if (this.opts.openOnEnter === !1 && a.which === k.ENTER)
                      return void A(a);
                    if (
                      a.which == k.DOWN ||
                      a.which == k.UP ||
                      (a.which == k.ENTER && this.opts.openOnEnter)
                    ) {
                      if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey)
                        return;
                      return this.open(), void A(a);
                    }
                    return a.which == k.DELETE || a.which == k.BACKSPACE
                      ? (this.opts.allowClear && this.clear(), void A(a))
                      : void 0;
                  }
                })
              ),
              u(this.focusser),
              this.focusser.on(
                "keyup-change input",
                this.bind(function (a) {
                  if (this.opts.minimumResultsForSearch >= 0) {
                    if ((a.stopPropagation(), this.opened())) return;
                    this.open();
                  }
                })
              ),
              b.on(
                "mousedown touchstart",
                "abbr",
                this.bind(function (a) {
                  this.isInterfaceEnabled() &&
                    (this.clear(),
                    B(a),
                    this.close(),
                    this.selection && this.selection.focus());
                })
              ),
              b.on(
                "mousedown touchstart",
                this.bind(function (c) {
                  n(b),
                    this.container.hasClass("select2-container-active") ||
                      this.opts.element.trigger(a.Event("select2-focus")),
                    this.opened()
                      ? this.close()
                      : this.isInterfaceEnabled() && this.open(),
                    A(c);
                })
              ),
              d.on(
                "mousedown touchstart",
                this.bind(function () {
                  this.opts.shouldFocusInput(this) && this.search.focus();
                })
              ),
              b.on(
                "focus",
                this.bind(function (a) {
                  A(a);
                })
              ),
              this.focusser
                .on(
                  "focus",
                  this.bind(function () {
                    this.container.hasClass("select2-container-active") ||
                      this.opts.element.trigger(a.Event("select2-focus")),
                      this.container.addClass("select2-container-active");
                  })
                )
                .on(
                  "blur",
                  this.bind(function () {
                    this.opened() ||
                      (this.container.removeClass("select2-container-active"),
                      this.opts.element.trigger(a.Event("select2-blur")));
                  })
                ),
              this.search.on(
                "focus",
                this.bind(function () {
                  this.container.hasClass("select2-container-active") ||
                    this.opts.element.trigger(a.Event("select2-focus")),
                    this.container.addClass("select2-container-active");
                })
              ),
              this.initContainerWidth(),
              this.opts.element.hide(),
              this.setPlaceholder();
          },
          clear: function (b) {
            var c = this.selection.data("select2-data");
            if (c) {
              var d = a.Event("select2-clearing");
              if ((this.opts.element.trigger(d), d.isDefaultPrevented()))
                return;
              var e = this.getPlaceholderOption();
              this.opts.element.val(e ? e.val() : ""),
                this.selection.find(".select2-chosen").empty(),
                this.selection.removeData("select2-data"),
                this.setPlaceholder(),
                b !== !1 &&
                  (this.opts.element.trigger({
                    type: "select2-removed",
                    val: this.id(c),
                    choice: c,
                  }),
                  this.triggerChange({ removed: c }));
            }
          },
          initSelection: function () {
            if (this.isPlaceholderOptionSelected())
              this.updateSelection(null), this.close(), this.setPlaceholder();
            else {
              var c = this;
              this.opts.initSelection.call(
                null,
                this.opts.element,
                function (a) {
                  a !== b &&
                    null !== a &&
                    (c.updateSelection(a),
                    c.close(),
                    c.setPlaceholder(),
                    (c.lastSearchTerm = c.search.val()));
                }
              );
            }
          },
          isPlaceholderOptionSelected: function () {
            var a;
            return this.getPlaceholder() === b
              ? !1
              : ((a = this.getPlaceholderOption()) !== b &&
                  a.prop("selected")) ||
                  "" === this.opts.element.val() ||
                  this.opts.element.val() === b ||
                  null === this.opts.element.val();
          },
          prepareOpts: function () {
            var b = this.parent.prepareOpts.apply(this, arguments),
              c = this;
            return (
              "select" === b.element.get(0).tagName.toLowerCase()
                ? (b.initSelection = function (a, b) {
                    var d = a.find("option").filter(function () {
                      return this.selected && !this.disabled;
                    });
                    b(c.optionToData(d));
                  })
                : "data" in b &&
                  (b.initSelection =
                    b.initSelection ||
                    function (c, d) {
                      var e = c.val(),
                        f = null;
                      b.query({
                        matcher: function (a, c, d) {
                          var g = r(e, b.id(d));
                          return g && (f = d), g;
                        },
                        callback: a.isFunction(d)
                          ? function () {
                              d(f);
                            }
                          : a.noop,
                      });
                    }),
              b
            );
          },
          getPlaceholder: function () {
            return this.select && this.getPlaceholderOption() === b
              ? b
              : this.parent.getPlaceholder.apply(this, arguments);
          },
          setPlaceholder: function () {
            var a = this.getPlaceholder();
            if (this.isPlaceholderOptionSelected() && a !== b) {
              if (this.select && this.getPlaceholderOption() === b) return;
              this.selection
                .find(".select2-chosen")
                .html(this.opts.escapeMarkup(a)),
                this.selection.addClass("select2-default"),
                this.container.removeClass("select2-allowclear");
            }
          },
          postprocessResults: function (a, b, c) {
            var d = 0,
              e = this;
            if (
              (this.findHighlightableChoices().each2(function (a, b) {
                return r(e.id(b.data("select2-data")), e.opts.element.val())
                  ? ((d = a), !1)
                  : void 0;
              }),
              c !== !1 &&
                (b === !0 && d >= 0 ? this.highlight(d) : this.highlight(0)),
              b === !0)
            ) {
              var g = this.opts.minimumResultsForSearch;
              g >= 0 && this.showSearch(L(a.results) >= g);
            }
          },
          showSearch: function (b) {
            this.showSearchInput !== b &&
              ((this.showSearchInput = b),
              this.dropdown
                .find(".select2-search")
                .toggleClass("select2-search-hidden", !b),
              this.dropdown
                .find(".select2-search")
                .toggleClass("select2-offscreen", !b),
              a(this.dropdown, this.container).toggleClass(
                "select2-with-searchbox",
                b
              ));
          },
          onSelect: function (a, b) {
            if (this.triggerSelect(a)) {
              var c = this.opts.element.val(),
                d = this.data();
              this.opts.element.val(this.id(a)),
                this.updateSelection(a),
                this.opts.element.trigger({
                  type: "select2-selected",
                  val: this.id(a),
                  choice: a,
                }),
                (this.lastSearchTerm = this.search.val()),
                this.close(),
                (b && b.noFocus) ||
                  !this.opts.shouldFocusInput(this) ||
                  this.focusser.focus(),
                r(c, this.id(a)) ||
                  this.triggerChange({ added: a, removed: d });
            }
          },
          updateSelection: function (a) {
            var d,
              e,
              c = this.selection.find(".select2-chosen");
            this.selection.data("select2-data", a),
              c.empty(),
              null !== a &&
                (d = this.opts.formatSelection(a, c, this.opts.escapeMarkup)),
              d !== b && c.append(d),
              (e = this.opts.formatSelectionCssClass(a, c)),
              e !== b && c.addClass(e),
              this.selection.removeClass("select2-default"),
              this.opts.allowClear &&
                this.getPlaceholder() !== b &&
                this.container.addClass("select2-allowclear");
          },
          val: function () {
            var a,
              c = !1,
              d = null,
              e = this,
              f = this.data();
            if (0 === arguments.length) return this.opts.element.val();
            if (
              ((a = arguments[0]),
              arguments.length > 1 &&
                ((c = arguments[1]),
                this.opts.debug &&
                  console &&
                  console.warn &&
                  console.warn(
                    'Select2: The second option to `select2("val")` is not supported in Select2 4.0.0. The `change` event will always be triggered in 4.0.0.'
                  )),
              this.select)
            )
              this.opts.debug &&
                console &&
                console.warn &&
                console.warn(
                  'Select2: Setting the value on a <select> using `select2("val")` is no longer supported in 4.0.0. You can use the `.val(newValue).trigger("change")` method provided by jQuery instead.'
                ),
                this.select
                  .val(a)
                  .find("option")
                  .filter(function () {
                    return this.selected;
                  })
                  .each2(function (a, b) {
                    return (d = e.optionToData(b)), !1;
                  }),
                this.updateSelection(d),
                this.setPlaceholder(),
                c && this.triggerChange({ added: d, removed: f });
            else {
              if (!a && 0 !== a) return void this.clear(c);
              if (this.opts.initSelection === b)
                throw new Error(
                  "cannot call val() if initSelection() is not defined"
                );
              this.opts.element.val(a),
                this.opts.initSelection(this.opts.element, function (a) {
                  e.opts.element.val(a ? e.id(a) : ""),
                    e.updateSelection(a),
                    e.setPlaceholder(),
                    c && e.triggerChange({ added: a, removed: f });
                });
            }
          },
          clearSearch: function () {
            this.search.val(""), this.focusser.val("");
          },
          data: function (a) {
            var c,
              d = !1;
            return 0 === arguments.length
              ? ((c = this.selection.data("select2-data")),
                c == b && (c = null),
                c)
              : (this.opts.debug &&
                  console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("data")` method can no longer set selected values in 4.0.0, consider using the `.val()` method instead.'
                  ),
                arguments.length > 1 && (d = arguments[1]),
                a
                  ? ((c = this.data()),
                    this.opts.element.val(a ? this.id(a) : ""),
                    this.updateSelection(a),
                    d && this.triggerChange({ added: a, removed: c }))
                  : this.clear(d),
                void 0);
          },
        })),
        (e = O(c, {
          createContainer: function () {
            var b = a(document.createElement("div"))
              .attr({ class: "select2-container select2-container-multi" })
              .html(
                [
                  "<ul class='select2-choices'>",
                  "  <li class='select2-search-field'>",
                  "    <label for='' class='select2-offscreen'></label>",
                  "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                  "  </li>",
                  "</ul>",
                  "<div class='select2-drop select2-drop-multi select2-display-none'>",
                  "   <ul class='select2-results'>",
                  "   </ul>",
                  "</div>",
                ].join("")
              );
            return b;
          },
          prepareOpts: function () {
            var b = this.parent.prepareOpts.apply(this, arguments),
              c = this;
            return (
              "select" === b.element.get(0).tagName.toLowerCase()
                ? (b.initSelection = function (a, b) {
                    var d = [];
                    a
                      .find("option")
                      .filter(function () {
                        return this.selected && !this.disabled;
                      })
                      .each2(function (a, b) {
                        d.push(c.optionToData(b));
                      }),
                      b(d);
                  })
                : "data" in b &&
                  (b.initSelection =
                    b.initSelection ||
                    function (c, d) {
                      var e = s(c.val(), b.separator, b.transformVal),
                        f = [];
                      b.query({
                        matcher: function (c, d, g) {
                          var h = a.grep(e, function (a) {
                            return r(a, b.id(g));
                          }).length;
                          return h && f.push(g), h;
                        },
                        callback: a.isFunction(d)
                          ? function () {
                              for (var a = [], c = 0; c < e.length; c++)
                                for (var g = e[c], h = 0; h < f.length; h++) {
                                  var i = f[h];
                                  if (r(g, b.id(i))) {
                                    a.push(i), f.splice(h, 1);
                                    break;
                                  }
                                }
                              d(a);
                            }
                          : a.noop,
                      });
                    }),
              b
            );
          },
          selectChoice: function (a) {
            var b = this.container.find(".select2-search-choice-focus");
            (b.length && a && a[0] == b[0]) ||
              (b.length && this.opts.element.trigger("choice-deselected", b),
              b.removeClass("select2-search-choice-focus"),
              a &&
                a.length &&
                (this.close(),
                a.addClass("select2-search-choice-focus"),
                this.opts.element.trigger("choice-selected", a)));
          },
          destroy: function () {
            a("label[for='" + this.search.attr("id") + "']").attr(
              "for",
              this.opts.element.attr("id")
            ),
              this.parent.destroy.apply(this, arguments),
              N.call(this, "searchContainer", "selection");
          },
          initContainer: function () {
            var c,
              b = ".select2-choices";
            (this.searchContainer = this.container.find(
              ".select2-search-field"
            )),
              (this.selection = c = this.container.find(b));
            var d = this;
            this.selection.on(
              "click",
              ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)",
              function (b) {
                d.search[0].focus(), d.selectChoice(a(this));
              }
            ),
              this.search.attr("id", "s2id_autogen" + f()),
              this.search
                .prev()
                .text(
                  a("label[for='" + this.opts.element.attr("id") + "']").text()
                )
                .attr("for", this.search.attr("id")),
              this.opts.element.on(
                "focus.select2",
                this.bind(function () {
                  this.focus();
                })
              ),
              this.search.on(
                "input paste",
                this.bind(function () {
                  (this.search.attr("placeholder") &&
                    0 == this.search.val().length) ||
                    (this.isInterfaceEnabled() &&
                      (this.opened() || this.open()));
                })
              ),
              this.search.attr("tabindex", this.elementTabIndex),
              (this.keydowns = 0),
              this.search.on(
                "keydown",
                this.bind(function (a) {
                  if (this.isInterfaceEnabled()) {
                    ++this.keydowns;
                    var b = c.find(".select2-search-choice-focus"),
                      d = b.prev(".select2-search-choice:not(.select2-locked)"),
                      e = b.next(".select2-search-choice:not(.select2-locked)"),
                      f = z(this.search);
                    if (
                      b.length &&
                      (a.which == k.LEFT ||
                        a.which == k.RIGHT ||
                        a.which == k.BACKSPACE ||
                        a.which == k.DELETE ||
                        a.which == k.ENTER)
                    ) {
                      var g = b;
                      return (
                        a.which == k.LEFT && d.length
                          ? (g = d)
                          : a.which == k.RIGHT
                          ? (g = e.length ? e : null)
                          : a.which === k.BACKSPACE
                          ? this.unselect(b.first()) &&
                            (this.search.width(10), (g = d.length ? d : e))
                          : a.which == k.DELETE
                          ? this.unselect(b.first()) &&
                            (this.search.width(10), (g = e.length ? e : null))
                          : a.which == k.ENTER && (g = null),
                        this.selectChoice(g),
                        A(a),
                        void ((g && g.length) || this.open())
                      );
                    }
                    if (
                      ((a.which === k.BACKSPACE && 1 == this.keydowns) ||
                        a.which == k.LEFT) &&
                      0 == f.offset &&
                      !f.length
                    )
                      return (
                        this.selectChoice(
                          c
                            .find(".select2-search-choice:not(.select2-locked)")
                            .last()
                        ),
                        void A(a)
                      );
                    if ((this.selectChoice(null), this.opened()))
                      switch (a.which) {
                        case k.UP:
                        case k.DOWN:
                          return (
                            this.moveHighlight(a.which === k.UP ? -1 : 1),
                            void A(a)
                          );
                        case k.ENTER:
                          return this.selectHighlighted(), void A(a);
                        case k.TAB:
                          return (
                            this.selectHighlighted({ noFocus: !0 }),
                            void this.close()
                          );
                        case k.ESC:
                          return this.cancel(a), void A(a);
                      }
                    if (
                      a.which !== k.TAB &&
                      !k.isControl(a) &&
                      !k.isFunctionKey(a) &&
                      a.which !== k.BACKSPACE &&
                      a.which !== k.ESC
                    ) {
                      if (a.which === k.ENTER) {
                        if (this.opts.openOnEnter === !1) return;
                        if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey)
                          return;
                      }
                      this.open(),
                        (a.which === k.PAGE_UP || a.which === k.PAGE_DOWN) &&
                          A(a),
                        a.which === k.ENTER && A(a);
                    }
                  }
                })
              ),
              this.search.on(
                "keyup",
                this.bind(function (a) {
                  (this.keydowns = 0), this.resizeSearch();
                })
              ),
              this.search.on(
                "blur",
                this.bind(function (b) {
                  this.container.removeClass("select2-container-active"),
                    this.search.removeClass("select2-focused"),
                    this.selectChoice(null),
                    this.opened() || this.clearSearch(),
                    b.stopImmediatePropagation(),
                    this.opts.element.trigger(a.Event("select2-blur"));
                })
              ),
              this.container.on(
                "click",
                b,
                this.bind(function (b) {
                  this.isInterfaceEnabled() &&
                    (a(b.target).closest(".select2-search-choice").length > 0 ||
                      (this.selectChoice(null),
                      this.clearPlaceholder(),
                      this.container.hasClass("select2-container-active") ||
                        this.opts.element.trigger(a.Event("select2-focus")),
                      this.open(),
                      this.focusSearch(),
                      b.preventDefault()));
                })
              ),
              this.container.on(
                "focus",
                b,
                this.bind(function () {
                  this.isInterfaceEnabled() &&
                    (this.container.hasClass("select2-container-active") ||
                      this.opts.element.trigger(a.Event("select2-focus")),
                    this.container.addClass("select2-container-active"),
                    this.dropdown.addClass("select2-drop-active"),
                    this.clearPlaceholder());
                })
              ),
              this.initContainerWidth(),
              this.opts.element.hide(),
              this.clearSearch();
          },
          enableInterface: function () {
            this.parent.enableInterface.apply(this, arguments) &&
              this.search.prop("disabled", !this.isInterfaceEnabled());
          },
          initSelection: function () {
            if (
              ("" === this.opts.element.val() &&
                "" === this.opts.element.text() &&
                (this.updateSelection([]), this.close(), this.clearSearch()),
              this.select || "" !== this.opts.element.val())
            ) {
              var c = this;
              this.opts.initSelection.call(
                null,
                this.opts.element,
                function (a) {
                  a !== b &&
                    null !== a &&
                    (c.updateSelection(a), c.close(), c.clearSearch());
                }
              );
            }
          },
          clearSearch: function () {
            var a = this.getPlaceholder(),
              c = this.getMaxSearchWidth();
            a !== b &&
            0 === this.getVal().length &&
            this.search.hasClass("select2-focused") === !1
              ? (this.search.val(a).addClass("select2-default"),
                this.search.width(c > 0 ? c : this.container.css("width")))
              : this.search.val("").width(10);
          },
          clearPlaceholder: function () {
            this.search.hasClass("select2-default") &&
              this.search.val("").removeClass("select2-default");
          },
          opening: function () {
            this.clearPlaceholder(),
              this.resizeSearch(),
              this.parent.opening.apply(this, arguments),
              this.focusSearch(),
              this.prefillNextSearchTerm(),
              this.updateResults(!0),
              this.opts.shouldFocusInput(this) && this.search.focus(),
              this.opts.element.trigger(a.Event("select2-open"));
          },
          close: function () {
            this.opened() && this.parent.close.apply(this, arguments);
          },
          focus: function () {
            this.close(), this.search.focus();
          },
          isFocused: function () {
            return this.search.hasClass("select2-focused");
          },
          updateSelection: function (b) {
            var c = {},
              d = [],
              e = this;
            a(b).each(function () {
              e.id(this) in c || ((c[e.id(this)] = 0), d.push(this));
            }),
              this.selection.find(".select2-search-choice").remove(),
              this.addSelectedChoice(d),
              e.postprocessResults();
          },
          tokenize: function () {
            var a = this.search.val();
            (a = this.opts.tokenizer.call(
              this,
              a,
              this.data(),
              this.bind(this.onSelect),
              this.opts
            )),
              null != a &&
                a != b &&
                (this.search.val(a), a.length > 0 && this.open());
          },
          onSelect: function (a, b) {
            this.triggerSelect(a) &&
              "" !== a.text &&
              (this.addSelectedChoice(a),
              this.opts.element.trigger({
                type: "selected",
                val: this.id(a),
                choice: a,
              }),
              (this.lastSearchTerm = this.search.val()),
              this.clearSearch(),
              this.updateResults(),
              (this.select || !this.opts.closeOnSelect) &&
                this.postprocessResults(a, !1, this.opts.closeOnSelect === !0),
              this.opts.closeOnSelect
                ? (this.close(), this.search.width(10))
                : this.countSelectableResults() > 0
                ? (this.search.width(10),
                  this.resizeSearch(),
                  this.getMaximumSelectionSize() > 0 &&
                  this.val().length >= this.getMaximumSelectionSize()
                    ? this.updateResults(!0)
                    : this.prefillNextSearchTerm() && this.updateResults(),
                  this.positionDropdown())
                : (this.close(), this.search.width(10)),
              this.triggerChange({ added: a }),
              (b && b.noFocus) || this.focusSearch());
          },
          cancel: function () {
            this.close(), this.focusSearch();
          },
          addSelectedChoice: function (b) {
            var c = this.getVal(),
              d = this;
            a(b).each(function () {
              c.push(d.createChoice(this));
            }),
              this.setVal(c);
          },
          createChoice: function (c) {
            var i,
              j,
              d = !c.locked,
              e = a(
                "<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"
              ),
              f = a(
                "<li class='select2-search-choice select2-locked'><div></div></li>"
              ),
              g = d ? e : f,
              h = this.id(c);
            return (
              (i = this.opts.formatSelection(
                c,
                g.find("div"),
                this.opts.escapeMarkup
              )),
              i != b && g.find("div").replaceWith(a("<div></div>").html(i)),
              (j = this.opts.formatSelectionCssClass(c, g.find("div"))),
              j != b && g.addClass(j),
              d &&
                g
                  .find(".select2-search-choice-close")
                  .on("mousedown", A)
                  .on(
                    "click dblclick",
                    this.bind(function (b) {
                      this.isInterfaceEnabled() &&
                        (this.unselect(a(b.target)),
                        this.selection
                          .find(".select2-search-choice-focus")
                          .removeClass("select2-search-choice-focus"),
                        A(b),
                        this.close(),
                        this.focusSearch());
                    })
                  )
                  .on(
                    "focus",
                    this.bind(function () {
                      this.isInterfaceEnabled() &&
                        (this.container.addClass("select2-container-active"),
                        this.dropdown.addClass("select2-drop-active"));
                    })
                  ),
              g.data("select2-data", c),
              g.insertBefore(this.searchContainer),
              h
            );
          },
          unselect: function (b) {
            var d,
              e,
              c = this.getVal();
            if (((b = b.closest(".select2-search-choice")), 0 === b.length))
              throw (
                "Invalid argument: " + b + ". Must be .select2-search-choice"
              );
            if ((d = b.data("select2-data"))) {
              var f = a.Event("select2-removing");
              if (
                ((f.val = this.id(d)),
                (f.choice = d),
                this.opts.element.trigger(f),
                f.isDefaultPrevented())
              )
                return !1;
              for (; (e = p(this.id(d), c)) >= 0; )
                c.splice(e, 1),
                  this.setVal(c),
                  this.select && this.postprocessResults();
              return (
                b.remove(),
                this.opts.element.trigger({
                  type: "select2-removed",
                  val: this.id(d),
                  choice: d,
                }),
                this.triggerChange({ removed: d }),
                !0
              );
            }
          },
          postprocessResults: function (a, b, c) {
            var d = this.getVal(),
              e = this.results.find(".select2-result"),
              f = this.results.find(".select2-result-with-children"),
              g = this;
            e.each2(function (a, b) {
              var c = g.id(b.data("select2-data"));
              p(c, d) >= 0 &&
                (b.addClass("select2-selected"),
                b
                  .find(".select2-result-selectable")
                  .addClass("select2-selected"));
            }),
              f.each2(function (a, b) {
                b.is(".select2-result-selectable") ||
                  0 !==
                    b.find(".select2-result-selectable:not(.select2-selected)")
                      .length ||
                  b.addClass("select2-selected");
              }),
              -1 == this.highlight() &&
                c !== !1 &&
                this.opts.closeOnSelect === !0 &&
                g.highlight(0),
              !this.opts.createSearchChoice &&
                !e.filter(".select2-result:not(.select2-selected)").length >
                  0 &&
                (!a ||
                  (a &&
                    !a.more &&
                    0 === this.results.find(".select2-no-results").length)) &&
                J(g.opts.formatNoMatches, "formatNoMatches") &&
                this.results.append(
                  "<li class='select2-no-results'>" +
                    K(g.opts.formatNoMatches, g.opts.element, g.search.val()) +
                    "</li>"
                );
          },
          getMaxSearchWidth: function () {
            return this.selection.width() - t(this.search);
          },
          resizeSearch: function () {
            var a,
              b,
              c,
              d,
              e,
              f = t(this.search);
            (a = C(this.search) + 10),
              (b = this.search.offset().left),
              (c = this.selection.width()),
              (d = this.selection.offset().left),
              (e = c - (b - d) - f),
              a > e && (e = c - f),
              40 > e && (e = c - f),
              0 >= e && (e = a),
              this.search.width(Math.floor(e));
          },
          getVal: function () {
            var a;
            return this.select
              ? ((a = this.select.val()), null === a ? [] : a)
              : ((a = this.opts.element.val()),
                s(a, this.opts.separator, this.opts.transformVal));
          },
          setVal: function (b) {
            if (this.select) this.select.val(b);
            else {
              var c = [],
                d = {};
              a(b).each(function () {
                this in d || (c.push(this), (d[this] = 0));
              }),
                this.opts.element.val(
                  0 === c.length ? "" : c.join(this.opts.separator)
                );
            }
          },
          buildChangeDetails: function (a, b) {
            for (var b = b.slice(0), a = a.slice(0), c = 0; c < b.length; c++)
              for (var d = 0; d < a.length; d++)
                if (r(this.opts.id(b[c]), this.opts.id(a[d]))) {
                  b.splice(c, 1), c--, a.splice(d, 1);
                  break;
                }
            return { added: b, removed: a };
          },
          val: function (c, d) {
            var e,
              f = this;
            if (0 === arguments.length) return this.getVal();
            if (((e = this.data()), e.length || (e = []), !c && 0 !== c))
              return (
                this.opts.element.val(""),
                this.updateSelection([]),
                this.clearSearch(),
                void (
                  d && this.triggerChange({ added: this.data(), removed: e })
                )
              );
            if ((this.setVal(c), this.select))
              this.opts.initSelection(
                this.select,
                this.bind(this.updateSelection)
              ),
                d &&
                  this.triggerChange(this.buildChangeDetails(e, this.data()));
            else {
              if (this.opts.initSelection === b)
                throw new Error(
                  "val() cannot be called if initSelection() is not defined"
                );
              this.opts.initSelection(this.opts.element, function (b) {
                var c = a.map(b, f.id);
                f.setVal(c),
                  f.updateSelection(b),
                  f.clearSearch(),
                  d && f.triggerChange(f.buildChangeDetails(e, f.data()));
              });
            }
            this.clearSearch();
          },
          onSortStart: function () {
            if (this.select)
              throw new Error(
                "Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead."
              );
            this.search.width(0), this.searchContainer.hide();
          },
          onSortEnd: function () {
            var b = [],
              c = this;
            this.searchContainer.show(),
              this.searchContainer.appendTo(this.searchContainer.parent()),
              this.resizeSearch(),
              this.selection.find(".select2-search-choice").each(function () {
                b.push(c.opts.id(a(this).data("select2-data")));
              }),
              this.setVal(b),
              this.triggerChange();
          },
          data: function (b, c) {
            var e,
              f,
              d = this;
            return 0 === arguments.length
              ? this.selection
                  .children(".select2-search-choice")
                  .map(function () {
                    return a(this).data("select2-data");
                  })
                  .get()
              : ((f = this.data()),
                b || (b = []),
                (e = a.map(b, function (a) {
                  return d.opts.id(a);
                })),
                this.setVal(e),
                this.updateSelection(b),
                this.clearSearch(),
                c &&
                  this.triggerChange(this.buildChangeDetails(f, this.data())),
                void 0);
          },
        })),
        (a.fn.select2 = function () {
          var d,
            e,
            f,
            g,
            h,
            c = Array.prototype.slice.call(arguments, 0),
            i = [
              "val",
              "destroy",
              "opened",
              "open",
              "close",
              "focus",
              "isFocused",
              "container",
              "dropdown",
              "onSortStart",
              "onSortEnd",
              "enable",
              "disable",
              "readonly",
              "positionDropdown",
              "data",
              "search",
            ],
            j = ["opened", "isFocused", "container", "dropdown"],
            k = ["val", "data"],
            l = { search: "externalSearch" };
          return (
            this.each(function () {
              if (0 === c.length || "object" == typeof c[0])
                (d = 0 === c.length ? {} : a.extend({}, c[0])),
                  (d.element = a(this)),
                  "select" === d.element.get(0).tagName.toLowerCase()
                    ? (h = d.element.prop("multiple"))
                    : ((h = d.multiple || !1),
                      "tags" in d && (d.multiple = h = !0)),
                  (e = h
                    ? new window.Select2["class"].multi()
                    : new window.Select2["class"].single()),
                  e.init(d);
              else {
                if ("string" != typeof c[0])
                  throw "Invalid arguments to select2 plugin: " + c;
                if (p(c[0], i) < 0) throw "Unknown method: " + c[0];
                if (((g = b), (e = a(this).data("select2")), e === b)) return;
                if (
                  ((f = c[0]),
                  "container" === f
                    ? (g = e.container)
                    : "dropdown" === f
                    ? (g = e.dropdown)
                    : (l[f] && (f = l[f]), (g = e[f].apply(e, c.slice(1)))),
                  p(c[0], j) >= 0 || (p(c[0], k) >= 0 && 1 == c.length))
                )
                  return !1;
              }
            }),
            g === b ? this : g
          );
        }),
        (a.fn.select2.defaults = {
          debug: !1,
          width: "copy",
          loadMorePadding: 0,
          closeOnSelect: !0,
          openOnEnter: !0,
          containerCss: {},
          dropdownCss: {},
          containerCssClass: "",
          dropdownCssClass: "",
          formatResult: function (a, b, c, d) {
            var e = [];
            return E(this.text(a), c.term, e, d), e.join("");
          },
          transformVal: function (b) {
            return a.trim(b);
          },
          formatSelection: function (a, c, d) {
            return a ? d(this.text(a)) : b;
          },
          sortResults: function (a, b, c) {
            return a;
          },
          formatResultCssClass: function (a) {
            return a.css;
          },
          formatSelectionCssClass: function (a, c) {
            return b;
          },
          minimumResultsForSearch: 0,
          minimumInputLength: 0,
          maximumInputLength: null,
          maximumSelectionSize: 0,
          id: function (a) {
            return a == b ? null : a.id;
          },
          text: function (b) {
            return b && this.data && this.data.text
              ? a.isFunction(this.data.text)
                ? this.data.text(b)
                : b[this.data.text]
              : b.text;
          },
          matcher: function (a, b) {
            return (
              o("" + b)
                .toUpperCase()
                .indexOf(o("" + a).toUpperCase()) >= 0
            );
          },
          separator: ",",
          tokenSeparators: [],
          tokenizer: M,
          escapeMarkup: F,
          blurOnChange: !1,
          selectOnBlur: !1,
          adaptContainerCssClass: function (a) {
            return a;
          },
          adaptDropdownCssClass: function (a) {
            return null;
          },
          nextSearchTerm: function (a, c) {
            return b;
          },
          searchInputPlaceholder: "",
          createSearchChoicePosition: "top",
          shouldFocusInput: function (a) {
            var b = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
            return b && a.opts.minimumResultsForSearch < 0 ? !1 : !0;
          },
        }),
        (a.fn.select2.locales = []),
        (a.fn.select2.locales.en = {
          formatMatches: function (a) {
            return 1 === a
              ? "One result is available, press enter to select it."
              : a +
                  " results are available, use up and down arrow keys to navigate.";
          },
          formatNoMatches: function () {
            return "No matches found";
          },
          formatAjaxError: function (a, b, c) {
            return "Loading failed";
          },
          formatInputTooShort: function (a, b) {
            var c = b - a.length;
            return (
              "Please enter " + c + " or more character" + (1 == c ? "" : "s")
            );
          },
          formatInputTooLong: function (a, b) {
            var c = a.length - b;
            return "Please delete " + c + " character" + (1 == c ? "" : "s");
          },
          formatSelectionTooBig: function (a) {
            return "You can only select " + a + " item" + (1 == a ? "" : "s");
          },
          formatLoadMore: function (a) {
            return "Loading more results\u2026";
          },
          formatSearching: function () {
            return "Searching\u2026";
          },
        }),
        a.extend(a.fn.select2.defaults, a.fn.select2.locales.en),
        (a.fn.select2.ajaxDefaults = {
          transport: a.ajax,
          params: { type: "GET", cache: !1, dataType: "json" },
        }),
        (window.Select2 = {
          query: { ajax: G, local: H, tags: I },
          util: {
            debounce: w,
            markMatch: E,
            escapeMarkup: F,
            stripDiacritics: o,
          },
          class: { abstract: c, single: d, multi: e },
        });
    }
  })(jQuery);
