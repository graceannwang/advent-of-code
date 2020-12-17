#lang typed/racket

(require "../../include/core.rkt")

(require typed/test-engine/racket-tests)

(define lines (file->lines "puzzle-input.txt"))

(: line->password (-> String String))
;; extracts the password as a string
(define (line->password ln)
  (list->string (drop (after-first-ch (string->list ln) #\:) 1)))

(check-expect (line->password "8-9 x: xxxxxxxrk") "xxxxxxxrk")

(: line->ch (-> String Char))
;; extracts the given letter of the policy
(define (line->ch ln)
  (last (until-first-ch (string->list ln) #\:)))

(check-expect (line->ch "8-9 x: xxxxxxxrk") #\x)

(: line->min (-> String Integer))
;; extracts the minimum number of occurences for the policy's letter
(define (line->min ln)
  (cast (string->number (list->string (until-first-ch (string->list ln) #\-)))
        Integer))

(check-expect (line->min "8-9 x: xxxxxxxrk") 8)

(: line->max (-> String Integer))
;; extracts the maximum number of occurences for the policy's letter
(define (line->max ln)
  (cast
   (string->number
    (list->string
     (until-first-ch
      (after-first-ch (string->list ln) #\-)
      #\space)))
   Integer))

(check-expect (line->max "8-9 x: xxxxxxxrk") 9)

(: count (All (A) (-> (-> A Boolean) (Listof A) Integer)))
;; counts the number of times an element of the given list returns true
;;  of the given function
(define (count x? lst)
  (match lst
    [(cons h t)
     (if (x? h)
         (add1 (count x? t))
         (count x? t))]
    ['() 0]))

(check-expect (count even? (list 1 2 3 4 5)) 2)
(check-expect (count even? (list 1 3 5 9)) 0)

(: valid? (-> String Boolean))
;; determines whether the password of a given line from the
;;  input is valid
(define (valid? ln)
  (local
    {(define freq
       (count
        (lambda ([c : Char])
          (char=? c (line->ch ln)))
        (string->list (line->password ln))))}
    (and (<= (line->min ln) freq)
         (<= freq (line->max ln)))))

(check-expect (valid? "1-4 g: gggg") #t)
(check-expect (valid? "1-3 j: djjfz") #t)
(check-expect (valid? "7-8 k: xpkmjlxkt") #f)

(: number-of-valid (-> (Listof String) Integer))
;; computes the number of valid passwords from the input
(define (number-of-valid lines)
  (count valid? lines))

(test)