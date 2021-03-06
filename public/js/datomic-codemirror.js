// Generated by CoffeeScript 1.3.3

/*
Author: Shaun Gilchrist
Branched from Hans Engel's Clojure mode
*/


(function() {

  CodeMirror.defineMode("datomic", function(config, mode) {
    var ATOM, BRACKET, BUILTIN, COMMENT, INDENT_WORD_SKIP, KEYWORD, KEYWORDS_SKIP, NUMBER, STRING, SYMBOL, TAG, atoms, builtins, hooks, indentKeys, isNumber, keywords, makeKeywords, popStack, pushStack, stateStack, tests;
    hooks = config.mode.hooks || {};
    makeKeywords = function(str) {
      var i, obj, words;
      obj = {};
      words = str.split(" ");
      i = 0;
      while (i < words.length) {
        obj[words[i]] = true;
        ++i;
      }
      return obj;
    };
    stateStack = function(indent, type, prev) {
      this.indent = indent;
      this.type = type;
      return this.prev = prev;
    };
    pushStack = function(state, indent, type) {
      return state.indentStack = new stateStack(indent, type, state.indentStack);
    };
    popStack = function(state) {
      return state.indentStack = state.indentStack.prev;
    };
    isNumber = function(ch, stream) {
      if (ch === "0" && stream.eat(/x/i)) {
        stream.eatWhile(tests.hex);
        return true;
      }
      if ((ch === "+" || ch === "-") && (tests.digit.test(stream.peek()))) {
        stream.eat(tests.sign);
        ch = stream.next();
      }
      if (tests.digit.test(ch)) {
        stream.eat(ch);
        stream.eatWhile(tests.digit);
        if ("." === stream.peek()) {
          stream.eat(".");
          stream.eatWhile(tests.digit);
        }
        if (stream.eat(tests.exponent)) {
          stream.eat(tests.sign);
          stream.eatWhile(tests.digit);
        }
        return true;
      }
      return false;
    };
    BUILTIN = "builtin";
    COMMENT = "comment";
    STRING = "string";
    TAG = "tag";
    ATOM = "atom";
    NUMBER = "number";
    BRACKET = "bracket";
    KEYWORD = "keyword";
    SYMBOL = "symbol";
    INDENT_WORD_SKIP = 2;
    KEYWORDS_SKIP = 1;
    atoms = makeKeywords("true false nil");
    keywords = makeKeywords("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord defproject deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle");
    builtins = makeKeywords("* *1 *2 *3 *agent* *allow-unresolved-vars* *assert *clojure-version* *command-line-args* *compile-files* *compile-path* *e *err* *file* *flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *use-context-classloader* *warn-on-reflection* + - / < <= = == > >= accessor aclone agent agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec decimal? declare definline defmacro defmethod defmulti defn defn- defonce defstruct delay delay? deliver deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall doc dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq eval even? every? extend extend-protocol extend-type extends? extenders false? ffirst file-seq filter find find-doc find-ns find-var first float float-array float? floats flush fn fn? fnext for force format future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator hash hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map? mapcat max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod name namespace neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? or parents partial partition pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-doc print-dup print-method print-namespace-doc print-simple print-special-doc print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string reify reduce ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure release-pending-sends rem remove remove-method remove-ns repeat repeatedly replace replicate require reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-validator! set? short short-array shorts shutdown-agents slurp some sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-form-anchor special-symbol? split-at split-with str stream? string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync syntax-symbol-anchor take take-last take-nth take-while test the-ns time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-dec unchecked-divide unchecked-inc unchecked-multiply unchecked-negate unchecked-remainder unchecked-subtract underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision xml-seq");
    indentKeys = makeKeywords("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catch " + "let letfn binding loop for doseq dotimes when-let if-let " + "defstruct struct-map assoc " + "testing deftest " + "handler-case handle dotrace deftrace");
    tests = {
      digit: /\d/,
      digit_or_colon: /[\d:]/,
      hex: /[0-9a-f]/i,
      sign: /[+-]/,
      exponent: /e/i,
      keyword_char: /[^\s\(\[\;\)\]]/,
      basic: /[\w\$_\-]/,
      lang_keyword: /[\w*+!\-_?:\/\.]/
    };
    return {
      startState: function() {
        return {
          indentStack: null,
          indentation: 0,
          mode: false
        };
      },
      token: function(stream, state) {
        var ch, escaped, indentTemp, keyWord, letter, next, returnType;
        if (!(state.indentStack != null) && stream.sol()) {
          state.indentation = stream.indentation();
        }
        if (stream.eatSpace()) {
          return null;
        }
        returnType = null;
        switch (state.mode) {
          case "string":
            next = void 0;
            escaped = false;
            while ((next = stream.next()) != null) {
              if (next === "\"" && !escaped) {
                state.mode = false;
                break;
              }
              escaped = !escaped && next === "\\";
            }
            returnType = STRING;
            break;
          default:
            ch = stream.next();
            if (ch === "\"") {
              state.mode = "string";
              returnType = STRING;
            } else if (ch === "'" && !(tests.digit_or_colon.test(stream.peek()))) {
              returnType = ATOM;
            } else if (ch === ";") {
              stream.skipToEnd();
              returnType = COMMENT;
            } else if (isNumber(ch, stream)) {
              returnType = NUMBER;
            } else if (ch === "(" || ch === "[") {
              keyWord = "";
              indentTemp = stream.column();
              letter = void 0;
              /*
                        Either
                        (indent-word ..
                        (non-indent-word ..
                        (;something else, bracket, etc.
              */

              if (ch === "(") {
                while ((letter = stream.eat(tests.keyword_char)) != null) {
                  keyWord += letter;
                }
              }
              if (keyWord.length > 0 && (indentKeys.propertyIsEnumerable(keyWord) || /^(?:def|with)/.test(keyWord))) {
                pushStack(state, indentTemp + INDENT_WORD_SKIP, ch);
              } else {
                stream.eatSpace();
                if (stream.eol() || stream.peek() === ";") {
                  pushStack(state, indentTemp + 1, ch);
                } else {
                  pushStack(state, indentTemp + stream.current().length, ch);
                }
              }
              stream.backUp(stream.current().length - 1);
              returnType = BRACKET;
            } else if (ch === ")" || ch === "]") {
              returnType = BRACKET;
              if ((state.indentStack != null) && state.indentStack.type === (ch === ")" ? "(" : "[")) {
                popStack(state);
              }
            } else if (ch === ":") {
              stream.eatWhile(tests.lang_keyword);
              return ATOM + ((typeof hooks[":"] === "function" ? hooks[":"](stream.current()) : void 0) || "");
            } else if (ch === "?") {
              stream.eatWhile(tests.basic);
              return SYMBOL + ((typeof hooks["?"] === "function" ? hooks["?"](stream.current()) : void 0) || "");
            } else {
              stream.eatWhile(tests.basic);
              if (keywords && keywords.propertyIsEnumerable(stream.current())) {
                returnType = KEYWORD;
              } else if (builtins && builtins.propertyIsEnumerable(stream.current())) {
                returnType = BUILTIN;
              } else if (atoms && atoms.propertyIsEnumerable(stream.current())) {
                returnType = ATOM;
              } else {
                returnType = null;
              }
            }
        }
        return returnType;
      },
      indent: function(state, textAfter) {
        if (state.indentStack == null) {
          return state.indentation;
        }
        return state.indentStack.indent;
      }
    };
  });

  CodeMirror.defineMIME("text/x-clojure", "datomic");

}).call(this);
