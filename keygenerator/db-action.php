<?php
$s = 7;
$max = pow(2, 13);

function serialGenV1ByTheJoker_Verify($a, $b, $c, $d, $e)
{
    return (1 == (($a * $b * $c * $d) % $e));
}

function serialGenV1ByTheJoker($max)
{
    do {
        $primeCandidate = rand(2, $max);
    } while (! isPrime($primeCandidate));
    //we got a prime number
    $p = $primeCandidate;
    $n = $p - 1;
    $m = rand(2, $n);

    //choosen of the first parameter
    $xa = rand(2, $n-1);
    while (gcd($xa, $n) != 1) {
        $xa = rand(1, $n-1);
    }

    //the second
    $xb = rand(2, $n-1);
    while (gcd($xb, $n) != 1) {
        $xb = rand(1, $n-1);
    }

    //the third
    $ya = extendedEuclidAlgo($n, $xa)[1];

    //the fourth
    $yb = extendedEuclidAlgo($n, $xb)[1];

    //first power mod n
    $m_xa = fastExponentiation_SQ_MUL($m, $xa, $n);

    //second power mod n
    $m_xa_xb = fastExponentiation_SQ_MUL($m_xa, $xb, $n);

    //third power mod n
    $m_xa_xb_ya = fastExponentiation_SQ_MUL($m_xa_xb, $ya, $n);

    // $m = 7184;
    // $n = 8068;
    // $xa = 6245;
    // $m_xa = fastExponentiation_SQ_MUL($m , $xa , $n);

    $serial[0] = $xa ;
    $serial[1] = $xb ;
    $serial[2] = $ya ;
    $serial[3] = $yb ;
    $serial[4] = $n ;
    return $serial;
    // return $p;
}

function isPrime($candidate)
{
    for ($i = 2 ; $i < intdiv($candidate, 2) ; $i++) {
        if ($candidate % $i == 0) {
            return false;
        }
    }
    return true;
}

function gcd($a, $b)
{
    $n = $a;
    $m = $b;
    if ($n == 0) {
        return $m;
    } elseif ($m == 0) {
        return $n;
    } elseif ($n == 1) {
        return $n;
    } elseif ($m == 1) {
        return $m;
    } elseif ($n >= $m) {
        return gcd($n%$m, $m);
    } elseif ($m < $n) {
        return gcd($n, $m%$n);
    }
}

function extendedEuclidAlgo($a, $b)
{
    //if $a > $b
    //that means that a should always be the base
    $s0 = 1 ;
    $t0 = 0 ;
    $s1 = 0 ;
    $t1 = 1 ;
    $ri_2 = $a;
    $ri_1 = $b;
    
    $si_2 = $s0;
    $si_1 = $s1;
    $ti_2 = $t0;
    $ti_1 = $t1;
    do {
        $ri = $ri_2 % $ri_1 ;
        $qi_1 = ($ri_2 - $ri)/$ri_1 ;
        $si = $si_2 - $qi_1 *$si_1 ;
        $ti = $ti_2 - $qi_1 *$ti_1 ;

        $ri_2 = $ri_1;
        $ri_1 = $ri;

        $si_2 = $si_1;
        $si_1 = $si;

        $ti_2 = $ti_1;
        $ti_1 = $ti;
    } while ($ri != 0);
    // gcd(r0,r1) = ri−1
    if ($si_2 < 0) {
        $s = $a + $si_2;
    } else {
        $s = $si_2;
    }
    if ($ti_2 < 0) {
        $t = $a + $ti_2;
    } else {
        $t= $ti_2;
    }

    $inverseMod[0] = $s ;
    $inverseMod[1] = $t ;
    return $inverseMod;
}

function fastExponentiation_SQ_MUL($base, $exp, $n)
{
    $h = decbin($exp);
    $r = $base ;
    $t = strlen($h);

    for ($i = 1 ; $i <= $t - 1 ; $i++) {
        $r = ($r * $r) % $n;
        if ($h[$i] == '1') {
            $r = ($r*$base) % $n;
        }
    }


    return $r;
}


$action = $_GET['action'];

try {
    if ($action == 'serialGen') {
        echo json_encode(serialGenV1ByTheJoker($max));
    } elseif ($action == 'serialVerify') {
        $serial = $_GET['serial'];
        $serial_tab = explode('.', $serial);
        $a = $serial_tab[0];
        $b = $serial_tab[1];
        $c = $serial_tab[2];
        $d = $serial_tab[3];
        $e = $serial_tab[4];
        echo  json_encode(serialGenV1ByTheJoker_Verify($a, $b, $c, $d, $e));
    }
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
