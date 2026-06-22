alter table public.waitlist
  drop constraint if exists waitlist_promo_code_allowed;

alter table public.waitlist
  add constraint waitlist_promo_code_allowed
  check (promo_code is null or promo_code = 'PRAISEFRED')
  not valid;
