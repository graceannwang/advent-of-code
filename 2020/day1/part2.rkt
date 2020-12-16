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

(: adds-to-2020 (-> Integer (Listof Integer) (Optional Integer)))
;; finds the integer in the list that adds to 2020 with the given integer,
;;  'None otherwise
(define (adds-to-2020 n ns)
  (match ns
    ['() 'None]
    [(cons h t)
     (match (+ n h)
       [2020 (Some h)]
       [_ (adds-to-2020 n t)])]))

(check-expect (adds-to-2020 0 (list 2 20 202 2020)) (Some 2020))
(check-expect (adds-to-2020 0 '()) 'None)
(check-expect (adds-to-2020 500 (list 3821 4322 1520 8382)) (Some 1520))
(check-expect (adds-to-2020 500 (list 1520 3821 4322 8382)) (Some 1520))
(check-expect (adds-to-2020 979 (list 0 366 675 0)) 'None)
(check-expect (adds-to-2020 979 (list 0 0 366 675)) 'None)

(: this-head (-> Integer (Listof Integer) (Optional Integer)))
;; finds the answer given a first value candidate, 'None otherwise
(define (this-head first ns)
  (match ns
    [(cons second tail)
     (match (adds-to-2020 (+ first second) tail)
       ['None (this-head first tail)]
       [(Some third) (Some (* first second third))])]
    [_ 'None]))

(check-expect (this-head 979 (list 366 675 0 0 0)) (Some 241861950))
(check-expect (this-head 979 (list 0 0 366 675 0)) (Some 241861950))
(check-expect (this-head 979 (list 0 0 0 366 675)) (Some 241861950))
(check-expect (this-head 979 (list 0 366 0 0 675)) (Some 241861950))
(check-expect (this-head 0 (list 979 366 675 0 0)) 'None)
  

(: key (-> (Listof Integer) Integer))
;; takes a list and multiplies three integers within this list that add
;;  to 2020
(define (key lst)
  (match lst
    [(cons h t)
     (match (this-head h t)
       ['None (key t)]
       [(Some k) k])]
    [_ (error "key: no key in this file")]))

(check-expect (key (list 979 366 675 0 0)) 241861950)
(check-expect (key (list 0 0 979 366 675)) 241861950)
(check-expect (key (list 0 979 366 675 0)) 241861950)
(check-error (key (list 1 2 3 4)) "key: no key in this file")





(test)