#lang typed/racket

(require typed/test-engine/racket-tests)

;; ======= character splitting
;; referenced code from Adam Shaw's CS15100 (Fall 2020)

(: until-first-ch (-> (Listof Char) Char (Listof Char)))
;; returns a list of characters up to but not including
;;  the given character
(define (until-first-ch chs ch)
  (match chs
    [(cons h t)
     (if (char=? h ch)
     '()
     (cons h (until-first-ch t ch)))]
    ['() '()]))

(check-expect (until-first-ch (list #\a #\b #\, #\c) #\,)
              (list #\a #\b))
(check-expect (until-first-ch (list #\a #\b #\, #\c #\, #\d #\e) #\,)
              (list #\a #\b))
(check-expect (until-first-ch (list #\, #\a #\b) #\,)
              '())

(: after-first-ch (-> (Listof Char) Char (Listof Char)))
;; returns a list of characters after and not including
;;  the given character
(define (after-first-ch chs ch)
  (match chs
    [(cons h t)
     (if (char=? h ch)
         t
         (after-first-ch t ch))]
    ['() '()]))

(check-expect (after-first-ch (list #\a #\b #\,) #\,)
              '())
(check-expect (after-first-ch (list #\, #\a #\b) #\,)
              (list #\a #\b))
(check-expect (after-first-ch (list #\a #\b #\, #\c) #\,)
              (list #\c))
(check-expect (after-first-ch (list #\a #\b #\, #\c #\, #\d #\e) #\,)
              (list #\c #\, #\d #\e))

(: last-ch-is-ch (-> String Char Boolean))
;; determines whether the last character of the string is the character
(define (last-ch-is-ch str ch)
  (and (> (string-length str) 0)
       (char=? (last (string->list str)) ch)))
         
(: split-chs-at-ch (-> (Listof Char) Char (Listof (Listof Char))))
;; splits list at the given character
(define (split-chs-at-ch chs ch)
  (match chs
    ['() '()]
    [_ (cons (until-first-ch chs ch)
             (split-chs-at-ch (after-first-ch chs ch) ch))]))

(check-expect (split-chs-at-ch (list #\a #\b #\, #\c) #\,)
              (list (list #\a #\b) (list #\c)))
(check-expect (split-chs-at-ch (list #\a #\b #\, #\c #\,) #\,)
              (list (list #\a #\b) (list #\c)))
(check-expect (split-chs-at-ch (list #\a #\b #\, #\c #\, #\d #\e) #\,)
              (list (list #\a #\b) (list #\c) (list #\d #\e)))
(check-expect (split-chs-at-ch (list #\, #\a #\b #\, #\c) #\,)
              (list '() (list #\a #\b) (list #\c)))

(: split-at-ch (-> String Char (Listof String)))
;; splits a string at the given character
(define (split-at-ch str ch)
  (local
    {(define strings
       (map list->string (split-chs-at-ch (string->list str) ch)))}
    (if (last-ch-is-ch str ch)
        (append strings (list ""))
        strings)))

(check-expect (split-at-ch "ab,c" #\,) (list "ab" "c"))
(check-expect (split-at-ch "ab,c," #\,) (list "ab" "c" ""))
(check-expect (split-at-ch ",ab,c," #\,) (list "" "ab" "c" ""))
(check-expect (split-at-ch "ab,c,de" #\,) (list "ab" "c" "de"))
(check-expect (split-at-ch "" #\,) '())

(provide (all-defined-out))

(test)