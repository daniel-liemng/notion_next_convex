'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '../single-image-dropzone';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

const CoverImageModal = () => {
  const params = useParams();

  const coverImage = useCoverImage();

  const { edgestore } = useEdgeStore();

  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      // WAY 01
      // let res;

      // if (coverImage.url) {
      //   res = await edgestore.publicFiles.upload({
      //     file,
      //     options: {
      //       replaceTargetUrl: coverImage.url,
      //     },
      //   });
      // } else {
      //   res = await edgestore.publicFiles.upload({
      //     file,
      //   });
      // }

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      });

      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </DialogHeader>

        <div>
          <SingleImageDropzone
            value={file}
            onChange={onChange}
            className='outline-none w-full'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
