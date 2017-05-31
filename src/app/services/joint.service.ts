import { Injectable } from '@angular/core';
import { KinectJoint } from '../models/kinectJoint.model';

@Injectable()
export class JointService{
    private kinectJoints: KinectJoint[] = new Array<KinectJoint>();

    constructor(){
        this.kinectJoints.push(new KinectJoint(0, "Base of the spine"));
        this.kinectJoints.push(new KinectJoint(1, "Middle of the spine"));
        this.kinectJoints.push(new KinectJoint(2, "Neck"));
        this.kinectJoints.push(new KinectJoint(3, "Head"));
        this.kinectJoints.push(new KinectJoint(4, "Left shoulder"));
        this.kinectJoints.push(new KinectJoint(5, "Left elbow"));
        this.kinectJoints.push(new KinectJoint(6, "Left wrist"));
        this.kinectJoints.push(new KinectJoint(7, "Left hand"));
        this.kinectJoints.push(new KinectJoint(8, "Right shoulder"));
        this.kinectJoints.push(new KinectJoint(9, "Right elbow"));
        this.kinectJoints.push(new KinectJoint(10, "Right wrist"));
        this.kinectJoints.push(new KinectJoint(11, "Right hand"));
        this.kinectJoints.push(new KinectJoint(12, "Left hip"));
        this.kinectJoints.push(new KinectJoint(13, "Left knee"));
        this.kinectJoints.push(new KinectJoint(14, "Left ankle"));
        this.kinectJoints.push(new KinectJoint(15, "Left foot"));
        this.kinectJoints.push(new KinectJoint(16, "Right hip"));
        this.kinectJoints.push(new KinectJoint(17, "Right knee"));
        this.kinectJoints.push(new KinectJoint(18, "Right ankle"));
        this.kinectJoints.push(new KinectJoint(19, "Right foot"));
        this.kinectJoints.push(new KinectJoint(20, "Spine at the shoulder"));
        this.kinectJoints.push(new KinectJoint(21, "Tip of the left hand"));
        this.kinectJoints.push(new KinectJoint(22, "Left thumb"));
        this.kinectJoints.push(new KinectJoint(23, "Tip of the right hand"));
        this.kinectJoints.push(new KinectJoint(24, "Right thumb"));
    }

    getJointList(): KinectJoint[]{
        return this.kinectJoints;
    }
}