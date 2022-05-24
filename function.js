const Linear =(x,z,Q)=>{
    var Stress = 2*Q/(22/7*Math.pow((1+Math.pow((x/z),2)),2));
     var ans = Number((z!==0)? Stress:0).toFixed(8) ;
    return ((ans>0.00001)?ans :((z!==0)? Stress:0) );
}

const Circular =(R,z,Q)=>{
    var Stress = Q*(1-(1/Math.pow(1+Math.pow((R/z),2),1.5))) ;
    var ans = Number((z!==0)? Stress:0).toFixed(8) ;
    return ((ans>0.00001)?ans :((z!==0)? Stress:0) );
}

const Point =(x,y,z,Q)=>{
    var r = Math.sqrt(x*x+y*y);
    const IiB = Math.pow((1+((r*r)/(z*z))),2.5);
    var Stress = 3*Q/(2*22/7*z*z**IiB);
    var ans = Number((z!==0)? Stress:0).toFixed(8) ;
    return ((ans>0.00001)?ans :((z!==0)? Stress:0) );
}
exports.point = Point;
exports.linear = Linear;
exports.circular = Circular;
