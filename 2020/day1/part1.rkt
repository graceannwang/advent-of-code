#lang typed/racket

(require typed/2htdp/image)
(require typed/2htdp/universe)

(require typed/test-engine/racket-tests)

(define lines (map (lambda ([n : String])
                     (cast (string->number n) Integer))
                   (file->lines "puzzle-input.txt")))

(define-type (Optional A) (U 'None (Some A)))

(define-struct (A) Some
  ([value : A])
  #:transparent)

(: second-value (-> Integer (Listof Integer) (Optional Integer)))
;; finds the second value
(define (second-value n ns)
  (match ns
    ['() 'None]
    [(cons h t)
     (match (+ n h)
       [2020 (Some h)]
       [_ (second-value n t)])]))

(check-expect (second-value 0 (list 2 20 202 2020)) (Some 2020))
(check-expect (second-value 0 '()) 'None)
(check-expect (second-value 500 (list 3821 4322 1520 8382)) (Some 1520))
(check-expect (second-value 500 (list 1520 3821 4322 8382)) (Some 1520))
  

(: key (-> (Listof Integer) Integer))
;; takes a list and multiplies the pair of integers within this list that
;;  to 2020
(define (key lst)
  (match lst
    ['() (error "key: no key in this file")]
    [(cons h t)
     (match (second-value h t)
       ['None (key t)]
       [(Some n) (* n h)])]))

(check-expect (key (list 1721 299 0 1 0 5)) 514579)
(check-expect (key (list 0 2020 423 5880)) 0)
(check-error (key (list 1 2 3 4)) "key: no key in this file")



(test)